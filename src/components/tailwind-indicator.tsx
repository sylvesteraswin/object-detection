export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="tail fixed bottom-2 right-2 z-[99999] flex h-6 w-6 items-center justify-center rounded-full bg-card p-3 font-mono text-xs text-foreground border-2 shadow-lg pointer-events-none">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
