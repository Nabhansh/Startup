import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "./Brand";

export function SiteHeader() {
  return (
    <header className="site-header" id="home">
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#subjects">Subjects</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQs</a>
        </nav>
        <Button variant="campus" className="nav-cta" asChild>
          <a href="#enquiry">
            Find your tutor <ArrowRight />
          </a>
        </Button>
      </div>
    </header>
  );
}
