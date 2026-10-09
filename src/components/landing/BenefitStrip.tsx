import { GraduationCap, Laptop, ShieldCheck, Users } from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Built for college students",
    detail: "Focused on your first & second year",
  },
  {
    icon: Users,
    title: "Personal, not one-size-fits-all",
    detail: "Your questions. Your learning pace.",
  },
  {
    icon: Laptop,
    title: "Learn where you’re comfortable",
    detail: "Online or at a suitable library",
  },
  {
    icon: ShieldCheck,
    title: "Clarity before commitment",
    detail: "Confirm the details before you pay",
  },
];

export function BenefitStrip() {
  return (
    <div className="benefit-strip">
      <div className="container benefit-inner">
        {benefits.map(({ icon: Icon, title, detail }) => (
          <div className="benefit-item" key={title}>
            <Icon />
            <div>
              {title}
              <small>{detail}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
