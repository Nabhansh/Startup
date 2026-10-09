import { MessageCircle, Sparkles, Users } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us where you’re stuck.",
    text: "Your subject, your year, your goals. Send an enquiry and let’s start with what matters to you.",
  },
  {
    icon: Users,
    title: "Find your kind of tutor.",
    text: "We’ll discuss a suitable tutor, session format and schedule. You confirm the details first.",
  },
  {
    icon: Sparkles,
    title: "Make it click, together.",
    text: "Work through concepts, ask every question, and practise with a clear, personalised plan.",
  },
];

export function HowItWorks() {
  return (
    <section className="section how-section container" id="how-it-works">
      <div className="how-inner">
        <div className="section-top">
          <div>
            <div className="eyebrow">LESS FRICTION. MORE LEARNING.</div>
            <h2>Your next “aha!” is three steps away.</h2>
          </div>
          <p className="section-summary">
            No complicated sign-ups. Just a conversation, a plan, and the support you need.
          </p>
        </div>
        <ol className="steps">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <article>
                <div className="step-header">
                  <span className="step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
