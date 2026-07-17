import { useState } from "react";

export default function useImageState() {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "error" | "loaded"
  >("loading");

  return { imageStatus, setImageStatus };
}
