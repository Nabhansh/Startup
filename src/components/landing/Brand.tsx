import { BookOpen } from "lucide-react";

export function Brand() {
  return (
    <a className="brand" href="#home" aria-label="CampusTutor home">
      <span className="brand-mark">
        <BookOpen size={23} strokeWidth={2} />
      </span>
      <span className="brand-word">
        Campus<span>Tutor</span>
      </span>
    </a>
  );
}
