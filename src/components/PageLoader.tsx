export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-primary fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(4,224,224,0.22),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(26,26,26,0.12),transparent_40%)]" />

      <div className="tablet:max-w-md tablet:rounded-4xl relative flex w-full flex-col items-center border border-white/70 bg-white/75 px-8 py-10 text-center shadow-[0_24px_70px_rgba(26,26,26,0.12)] backdrop-blur-xl">
        <div className="loader-ring border-cta/30 mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4">
          <div className="loader-dot bg-cta/90 h-10 w-10 rounded-full" />
        </div>

        <p className="text-cta mb-2 text-xs font-semibold tracking-[0.35em] uppercase">
          Travel Blog
        </p>
        <h1 className="text-font-dark text-size-lg font-semibold">
          Travel Explore
        </h1>
        <p className="text-font-dark/70 mt-3 text-sm leading-7">
          Curating your next coastal escape and hidden adventure.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="loader-dot-item bg-cta h-2.5 w-2.5 rounded-full opacity-70" />
          <span className="loader-dot-item bg-cta h-2.5 w-2.5 rounded-full opacity-70" />
          <span className="loader-dot-item bg-cta h-2.5 w-2.5 rounded-full opacity-70" />
        </div>
      </div>
    </div>
  );
}
