import { useEffect, useRef } from "react";

export function useModal(handler, listenCapturing = true) {
  const ref = useRef();
  // Created an useEffect func to Event handling & Triggers the Modal Display
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
