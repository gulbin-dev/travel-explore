import { useState, useEffect } from "react";

/** Custom hook to get window size when resizing the window  */
export default function useWindowSizeListener() {
  // Implementation for window size listener
  const [resizeKey, setResizeKey] = useState(0);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      // Only update state after user stops resizing for 200ms
      timeoutId = setTimeout(() => {
        setResizeKey((prev) => prev + 1);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return resizeKey; // Return the resizeKey to trigger re-renders in components that use this hook
}
