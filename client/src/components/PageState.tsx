interface PageStateProps {
  title: string;
  message: string;
}

export default function PageState({ title, message }: PageStateProps) {
  const isLoadingState = title.toLowerCase().startsWith("loading");

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-20">
      <div className="card-memorial max-w-2xl text-center">
        {isLoadingState ? (
          <div className="mb-8 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent/15" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent/90 border-r-accent/45 animate-spin" />
              <div className="absolute h-3 w-3 rounded-full bg-accent pulse-soft" />
            </div>
          </div>
        ) : null}
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">{title}</h1>
        <p className="text-base md:text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
