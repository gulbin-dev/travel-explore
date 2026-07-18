import { Image } from "@unpic/react";
import type { ImageProps } from "@unpic/react";
import { LoaderIcon, ErrorThumbnailIcon } from "@/utils/icons";
import useImageState from "@/hooks/useImageState";

type CardThumbnailProps = Omit<ImageProps, "layout" | "width" | "height"> & {
  src?: string;
};

export function CardThumbnail({ src }: CardThumbnailProps) {
  const { imageStatus, setImageStatus } = useImageState();
  return (
    <>
      {imageStatus === "loading" && (
        <LoaderIcon size={24} color="var(--color-cta)" />
      )}
      {imageStatus === "error" && (
        <ErrorThumbnailIcon size={90} color="white" />
      )}
      <Image
        src={src}
        alt=""
        layout="constrained"
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        breakpoints={[
          380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
        ]}
        className={`aspect-square rounded-2xl object-cover transition-opacity ${
          imageStatus === "loaded"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onLoadStart={() => setImageStatus("loading")}
        onError={() => setImageStatus("error")}
        onLoad={() => setImageStatus("loaded")}
      />
    </>
  );
}
