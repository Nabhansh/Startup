import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container pricing-inner">
        <div className="pricing-copy">
          <div className="eyebrow">A SMALL STEP. A SMART INVESTMENT.</div>
          <h2>
            One focused hour.
            <br />
            <em>A clearer way forward.</em>
          </h2>
          <p>
            No big packages to commit to. Start with your subject and goals, and agree on the
            details before your first session.
          </p>
          <span className="pricing-tag">
            <ShieldCheck /> No payment needed to enquire
          </span>
        </div>
        <div>
          <div className="rate-header">
            <div>
              <div className="rate-label">PROPOSED STARTING RATE</div>
              <div className="rate">
                ₹500 <span>/ hour</span>
              </div>
            </div>
            <span className="rate-badge">YOUR PACE. YOUR PLAN.</span>
          </div>
          <ul className="price-benefits">
            <li>
              <Check /> One-to-one, concept-first tutoring
            </li>
            <li>
              <Check /> Online or library sessions, where permitted
            </li>
            <li>
              <Check /> Tutor, schedule and rate confirmed in advance
            </li>
          </ul>
          <Button variant="campus" className="price-action" asChild>
            <a href="#enquiry">
              Let’s talk about your first session <ArrowRight />
            </a>
          </Button>
          <p className="price-note">
            Final pricing and tutor availability are confirmed before booking. Small-group rates may
            differ.
          </p>
        </div>
      </div>
    </section>
  );
}
