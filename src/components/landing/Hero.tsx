import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Laptop,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import tutoringPhoto from "@/assets/tutoring-session.jpg";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <img
        className="hero-photo"
        src={tutoringPhoto}
        alt="A tutor helping a small group of college students at a library table in the evening"
        width={1920}
        height={1088}
        fetchPriority="high"
      />
      <div className="container hero-content">
        <div className="eyebrow hero-kicker">COLLEGE TUTORING</div>
        <h1 id="hero-heading">
          Learn Better.
          <br />
          Score Higher.
          <br />
          <em>Go Further.</em>
        </h1>
        <p className="hero-lead">
          One-on-one and small group tutoring for 1st and 2nd year Aerospace Engineering and CSE
          students. Online or in library. <strong>₹500/hour.</strong>
        </p>
        <div className="hero-chips">
          <span>
            <BookOpen /> 1st &amp; 2nd Year Subjects
          </span>
          <span>
            <Laptop /> Online Classes
          </span>
          <span>
            <GraduationCap /> Library Sessions
          </span>
          <span>
            <Users /> Female Teachers
          </span>
        </div>
        <div className="hero-actions">
          <Button variant="campus" asChild>
            <a href="#enquiry">
              <MessageCircle /> Enquire on WhatsApp <ArrowRight />
            </a>
          </Button>
          <Button variant="campusOutline" asChild>
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
        <div className="hero-assurance">
          <span>
            <Check /> Quick Response
          </span>
          <span>
            <Check /> Flexible Timings
          </span>
          <span>
            <Check /> Personalised Guidance
          </span>
        </div>
      </div>
      <div className="photo-caption">
        <span className="caption-icon">
          <Sparkles size={23} />
        </span>
        <div>
          <strong>Less “I don’t get it.” More “I’ve got this.”</strong>
          <small>Clear concepts. Confident learning.</small>
        </div>
      </div>
    </section>
  );
}
