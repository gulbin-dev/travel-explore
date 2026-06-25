export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="text-font-dark relative z-20 flex h-screen flex-col place-content-center place-items-center">
      <h2>{error.name}</h2>
      <p>{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="text-primary bg-cta rounded-2xl p-3"
      >
        Refresh Page
      </button>
    </div>
  );
}
