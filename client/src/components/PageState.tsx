interface PageStateProps {
  title: string;
  message: string;
}

export default function PageState({ title, message }: PageStateProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-20">
      <div className="card-memorial max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">{title}</h1>
        <p className="text-base md:text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
