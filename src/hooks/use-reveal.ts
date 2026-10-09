import { useEffect } from "react";

const REVEAL_SELECTOR = [
  ".section-top",
  ".branch-panel",
  ".subject-card",
  ".steps article",
  ".pricing-copy",
  ".pricing-inner > div:last-child",
  ".enquiry-copy",
  ".enquiry-form",
  ".faq-layout > div",
  ".cta-card",
  ".benefit-item",
].join(", ");

// Fades sections in as they scroll into view. Disabled for reduced-motion users.
export function useReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(i % 5) * 70}ms`);
      observer.observe(el);
    });
    root.classList.add("js-reveal");
    return () => {
      observer.disconnect();
      root.classList.remove("js-reveal");
      items.forEach((el) => el.classList.remove("reveal", "in"));
    };
  }, []);
}
