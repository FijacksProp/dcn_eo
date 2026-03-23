## Render Deployment

This project is prepared for a two-service Render deployment:

- `dcn-eo-api`: Django web service
- `dcn-eo-web`: React static site

The repo includes a Blueprint file at [render.yaml](/c:/Users/USER/Desktop/DCN%20EO/render.yaml).

### Architecture

- The frontend is built as a static site from Vite.
- The backend runs Django + Gunicorn.
- Django serves the API and admin.
- Render serves the frontend over its static CDN.

### Backend Service

Render web service configuration:

- Root directory: `backend`
- Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- Start command: `gunicorn config.wsgi:application`

Required backend environment variables:

- `DATABASE_URL`
- `SECRET_KEY`
- `CORS_ALLOWED_ORIGINS`
- `CSRF_TRUSTED_ORIGINS`

Default backend production values already defined in `render.yaml`:

- `DEBUG=False`
- `USE_LOCAL_SQLITE=False`
- `ALLOWED_HOSTS=.onrender.com`
- `TIME_ZONE=Africa/Lagos`
- `CORS_ALLOWED_ORIGIN_REGEXES=^https://.*\.onrender\.com$`

### Frontend Service

Render static site configuration:

- Root directory: project root
- Build command: `corepack enable && corepack pnpm install --frozen-lockfile && corepack pnpm run build:frontend`
- Publish directory: `dist/public`

Required frontend environment variable:

- `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=https://dcn-eo-api.onrender.com/api
```

### Deployment Order

1. Deploy the Django web service first.
2. Set `DATABASE_URL` to your production Postgres database.
3. Set `CORS_ALLOWED_ORIGINS` to your frontend Render URL.
4. Set `CSRF_TRUSTED_ORIGINS` to your backend/frontend HTTPS origins as needed.
5. Run migrations on the backend service shell:

```bash
python manage.py migrate
python manage.py seed_memorial_demo
python manage.py import_tributes_docx "/opt/render/project/src/TRIBUTES.docx" --replace --profile-id 1
```

6. Deploy the frontend static site.
7. Set `VITE_API_BASE_URL` to the Django backend URL plus `/api`.

### Notes

- If you do not keep `TRIBUTES.docx` in the repo, skip the import command or upload/import the data by another route.
- Django production static files are handled with WhiteNoise.
- Render automatically injects `RENDER_EXTERNAL_HOSTNAME` and `RENDER_EXTERNAL_URL`, and Django settings now support them.
