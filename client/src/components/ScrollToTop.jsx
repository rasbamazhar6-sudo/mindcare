import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reset = (el) => {
      if (el) el.scrollTop = 0;
    };

    reset(document.documentElement);
    reset(document.body);
    reset(document.getElementById("main-content"));
    reset(document.getElementById("chat-scroll"));

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
}
