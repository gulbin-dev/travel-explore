import { LoaderIcon } from "@utils/icons";

export function ErrorChip() {
  return (
    <div className="bg-primary/10 text-primary w-fit rounded-2xl p-1 backdrop-blur-sm">
      <p className="flex max-w-fit gap-1">An error occured...</p>
    </div>
  );
}

export function LoadingChip() {
  return (
    <div className="bg-primary/10 text-primary relative h-fit w-fit shrink place-content-center place-self-center rounded-2xl p-1 backdrop-blur-sm">
      <p className="flex max-w-fit gap-1">
        <span className="inline-block animate-spin place-self-center">
          <LoaderIcon size={24} color="var(--color-cta)" />
        </span>
        Loading Image...
      </p>
    </div>
  );
}
