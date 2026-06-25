import { Image } from "@unpic/react";
import type { ImageProps } from "@unpic/react";
// 1. Create the wrapper component
type CardThumbnailProps = Omit<ImageProps, "layout" | "width" | "height"> & {
  src?: string;
};

export function CardThumbnail({ src }: CardThumbnailProps) {
  return (
    <Image
      src={src || "/card-img/camiguin/camiguin.webp"}
      layout="constrained"
      width={96}
      height={96}
      loading="lazy"
      decoding="async"
      breakpoints={[380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680]}
      className="aspect-square rounded-2xl object-cover"
      alt=""
    />
  );
}
