import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { recommendPlan } from "@/lib/plan.functions";
import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryForm,
} from "@/lib/enquiry";
import { SEO_DESC, SEO_TITLE, WHATSAPP_LINK } from "@/content/landing";
import { useReveal } from "@/hooks/use-reveal";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { BenefitStrip } from "@/components/landing/BenefitStrip";
import { Subjects } from "@/components/landing/Subjects";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Enquiry } from "@/components/landing/Enquiry";
import { Faq, CtaBand, SiteFooter } from "@/components/landing/FooterAndExtras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      {
        name: "keywords",
        content:
          "college tutor, engineering tutoring, aerospace engineering tutor, CSE tutor, maths tutor, physics tutor, coding tutor, DSA, DBMS, online tutoring India",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "CampusTutor" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "CampusTutor — A little guidance. A lot more clarity." },
      {
        property: "og:description",
        content:
          "Personal tutoring for Aerospace Engineering and CSE students — maths, physics, coding, DSA and DBMS. Online or in a library, ₹500/hour.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CampusTutor — College tutoring that makes it click" },
      {
        name: "twitter:description",
        content:
          "Aerospace & CSE tutoring for 1st and 2nd year students. ₹500/hour, online or in a library.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "CampusTutor",
          description: SEO_DESC,
          telephone: "+91-9423533691",
          areaServed: "IN",
          makesOffer: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: "500",
            description: "Tutoring per hour",
          },
        }),
      },
    ],
  }),
  component: CampusTutor,
});

const EMPTY_FORM: EnquiryForm = {
  name: "",
  year: "1st year",
  mode: "Online",
  subject: "",
  message: "",
};

function CampusTutor() {
  const [form, setForm] = useState<EnquiryForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [goals, setGoals] = useState("");
  const [plan, setPlan] = useState<string | null>(null);
  const [includePlan, setIncludePlan] = useState(true);
  const [planBusy, setPlanBusy] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const getPlan = useServerFn(recommendPlan);

  useReveal();

  const message = buildEnquiryMessage({ form, branch, goals, plan, includePlan });
  const whatsappUrl = buildWhatsAppUrl(message);

  function updateForm(patch: Partial<EnquiryForm>) {
    setForm((previous) => ({ ...previous, ...patch }));
    setErrors((previous) => {
      const next = { ...previous };
      for (const key of Object.keys(patch) as (keyof EnquiryErrors)[]) delete next[key];
      return next;
    });
  }

  function chooseSubject(subject: string) {
    updateForm({ subject });
    document.getElementById("enquiry")?.scrollIntoView?.({ behavior: "smooth" });
  }

  async function askPlan() {
    if (!form.subject.trim() || !goals.trim()) {
      setPlanError("Add your subject above and a line about your goals first.");
      return;
    }
    setPlanBusy(true);
    setPlanError(null);
    try {
      const result = await getPlan({
        data: { branch, year: form.year, subjects: form.subject.trim(), goals: goals.trim() },
      });
      if (result.plan) {
        setPlan(result.plan);
        setIncludePlan(true);
      } else {
        setPlanError(result.error);
      }
    } catch {
      setPlanError("Couldn’t create a plan right now. Please try again shortly.");
    } finally {
      setPlanBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    setSent(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BenefitStrip />
        <Subjects onChooseSubject={chooseSubject} />
        <HowItWorks />
        <Pricing />
        <Enquiry
          form={form}
          onFormChange={updateForm}
          errors={errors}
          onSubmit={submit}
          sent={sent}
          copied={copied}
          whatsappUrl={whatsappUrl}
          onCopy={copyEnquiry}
          plan={{
            branch,
            onBranchChange: setBranch,
            goals,
            onGoalsChange: setGoals,
            plan,
            planBusy,
            planError,
            includePlan,
            onIncludePlanChange: setIncludePlan,
            onAskPlan: askPlan,
          }}
        />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
      <a
        className="wa-float"
        href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hi CampusTutor, I’d like to enquire about tutoring.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CampusTutor on WhatsApp"
      >
        <MessageCircle /> <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
