import { Image } from "@unpic/react";
import type { ImageProps } from "@unpic/react";
import { useState } from "react";
import { LoaderThumbnailIcon, ErrorThumbnailIcon } from "@/utils/icons";

type CardThumbnailProps = Omit<ImageProps, "layout" | "width" | "height"> & {
  src?: string;
};

export function CardThumbnail({ src }: CardThumbnailProps) {
  const [imageStatus, setImageStatus] = useState<"loading" | "error">(
    "loading",
  );

  imageStatus === "loading" ? { LoaderThumbnailIcon } : { ErrorThumbnailIcon };
  return (
    <Image
      src={src}
      alt=""
      layout="constrained"
      width={96}
      height={96}
      loading="lazy"
      decoding="async"
      breakpoints={[380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680]}
      className="aspect-square rounded-2xl object-cover"
      onLoad={() => setImageStatus("loading")}
      onError={() => setImageStatus("error")}
    />
  );
}
