import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branches, subjects } from "@/content/landing";

type SubjectsProps = { onChooseSubject: (subject: string) => void };

export function Subjects({ onChooseSubject }: SubjectsProps) {
  return (
    <section className="section container" id="subjects">
      <div className="section-top">
        <div>
          <div className="eyebrow">A GOOD PLACE TO START</div>
          <h2>Big subjects. Made approachable.</h2>
        </div>
        <p className="section-summary">
          Maths, physics, coding and your branch subjects — Aerospace Engineering and CSE, one topic
          at a time.
        </p>
      </div>
      <div className="branch-grid">
        {branches.map(({ name, line, icon: Icon, list }) => (
          <div className="branch-panel" key={name}>
            <div className="branch-head">
              <span className="branch-icon">
                <Icon />
              </span>
              <div>
                <h3>{name}</h3>
                <p>{line}</p>
              </div>
            </div>
            <div className="branch-chips">
              {list.map((item) => (
                <Button
                  variant="ghost"
                  className="branch-chip"
                  key={item}
                  onClick={() => onChooseSubject(item)}
                  aria-label={`Enquire about ${item} in ${name}`}
                >
                  {item}
                  <ArrowRight />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="subject-grid">
        {subjects.map(({ title, detail, icon: Icon, tag }) => (
          <Button
            variant="ghost"
            className="subject-card"
            key={title}
            onClick={() => onChooseSubject(title)}
            aria-label={`Enquire about ${title}`}
          >
            <span className="subject-icon">
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{detail}</p>
            <span className="subject-bottom">
              <span>{tag}</span>
              <ArrowRight />
            </span>
          </Button>
        ))}
      </div>
      <p className="subject-note">
        Don’t see your subject?{" "}
        <a href="#enquiry">
          Let’s talk about it <span aria-hidden="true">↗</span>
        </a>
        <span> · Tutor availability varies by subject and branch.</span>
      </p>
    </section>
  );
}
