import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqs } from "@/content/landing";
import { Brand } from "./Brand";

export function Faq() {
  return (
    <section className="section faq-section container" id="faq">
      <div className="faq-layout">
        <div>
          <div className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</div>
          <h2>
            Good questions.
            <br />
            Straight answers.
          </h2>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band container" aria-labelledby="cta-heading">
      <div className="cta-card">
        <div>
          <h2 id="cta-heading">
            Ready to make it <em>click?</em>
          </h2>
          <p>
            Tell us your subject and preferred time. Your enquiry opens in WhatsApp, ready for you
            to send.
          </p>
        </div>
        <Button variant="campus" asChild>
          <a href="#enquiry">
            <MessageCircle /> Start your enquiry <ArrowRight />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#subjects">Subjects</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQs</a>
            <a href="#enquiry">Get in touch ↗</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CampusTutor. All rights reserved.</span>
          <span>Clear concepts. Confident learning.</span>
        </div>
      </div>
    </footer>
  );
}
