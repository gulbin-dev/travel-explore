import { LoaderIcon } from "@utils/icons";

export default function LoadingChip() {
  return (
    <div className="bg-primary/10 text-primary w-fit rounded-2xl p-1 backdrop-blur-sm">
      <p className="flex max-w-fit gap-1">
        <span className="inline-block animate-spin">{LoaderIcon}</span>
        Loading Image...
      </p>
    </div>
  );
}
