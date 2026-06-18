const MenuSpan = function MenuSpan({ className }: { className?: string }) {
  return <span className={`bg-cta h-1 w-6 rounded-sm ${className}`}></span>;
};

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-10 flex h-full max-h-12.5 w-full items-center justify-between px-3 py-1.25">
      <div className="bg-primary/10 absolute top-0 left-0 -z-1 h-full w-full shadow-[0px_-4px_4px_rgba(225,225,225,0.25)_inset] backdrop-blur-xs"></div>
      <img
        src="/logo-mobile.png"
        alt=""
        width={80}
        height={80}
        className="aspect-square"
      />
      <button className="flex max-h-6 flex-col justify-center gap-1.5">
        <MenuSpan />
        <span className="relative h-1">
          <MenuSpan className="absolute top-0 left-0" />
          <MenuSpan className="absolute top-0 left-0" />
        </span>
        <MenuSpan />
      </button>
      <nav className="hidden"></nav>
    </header>
  );
}
