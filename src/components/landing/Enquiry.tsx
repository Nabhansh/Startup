import type { FormEvent } from "react";
import { ArrowRight, Check, LockKeyhole, MessageCircle, Target, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ENQUIRY_LIMITS, type EnquiryErrors, type EnquiryForm } from "@/lib/enquiry";
import { PlanHelper, type PlanHelperProps } from "./PlanHelper";

export type EnquiryProps = {
  form: EnquiryForm;
  onFormChange: (patch: Partial<EnquiryForm>) => void;
  errors: EnquiryErrors;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  sent: boolean;
  copied: boolean;
  whatsappUrl: string;
  onCopy: () => void;
  plan: PlanHelperProps;
};

export function Enquiry(props: EnquiryProps) {
  const { form, onFormChange, errors, onSubmit, sent, copied, whatsappUrl, onCopy, plan } = props;
  return (
    <section className="section container" id="enquiry">
      <div className="enquiry-layout">
        <div className="enquiry-copy">
          <div className="eyebrow">YOU DON’T HAVE TO FIGURE IT OUT ALONE</div>
          <h2>
            Let’s start with
            <br />
            what you need.
          </h2>
          <p>
            A tough topic, an upcoming exam, or just a stronger foundation. Tell us a little about
            yourself and we’ll take it from there.
          </p>
          <div className="enquiry-points">
            <div className="enquiry-point">
              <MessageCircle aria-hidden="true" />
              <div>
                <strong>A conversation, not a commitment</strong>
                <small>Discuss your needs before deciding to book.</small>
              </div>
            </div>
            <div className="enquiry-point">
              <Target aria-hidden="true" />
              <div>
                <strong>Support built around you</strong>
                <small>Your subject, your goals, your schedule.</small>
              </div>
            </div>
            <div className="enquiry-point">
              <MapPin aria-hidden="true" />
              <div>
                <strong>Your space to learn</strong>
                <small>From your desk or a suitable local library.</small>
              </div>
            </div>
          </div>
        </div>

        <form className="enquiry-form" onSubmit={onSubmit} noValidate>
          <div className="form-title">
            <h3>Find your starting point.</h3>
            <span>ABOUT 1 MINUTE</span>
          </div>

          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              maxLength={ENQUIRY_LIMITS.name}
              placeholder="What should we call you?"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={form.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
            />
          </label>
          {errors.name && (
            <p id="name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}

          <div className="form-row">
            <label>
              College year
              <select
                name="year"
                value={form.year}
                onChange={(e) => onFormChange({ year: e.target.value })}
              >
                <option>1st year</option>
                <option>2nd year</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Session format
              <select
                name="mode"
                value={form.mode}
                onChange={(e) => onFormChange({ mode: e.target.value })}
              >
                <option>Online</option>
                <option>Library / in person</option>
                <option>Either</option>
              </select>
            </label>
          </div>

          <label>
            Your subject
            <input
              name="subject"
              maxLength={ENQUIRY_LIMITS.subject}
              placeholder="e.g. Maths, Physics, Coding"
              required
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              value={form.subject}
              onChange={(e) => onFormChange({ subject: e.target.value })}
            />
          </label>
          {errors.subject && (
            <p id="subject-error" className="field-error" role="alert">
              {errors.subject}
            </p>
          )}

          <label>
            Anything else? <span className="optional">(optional)</span>
            <textarea
              name="message"
              maxLength={ENQUIRY_LIMITS.message}
              placeholder="A tricky topic, exam date or preferred time…"
              rows={3}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              value={form.message}
              onChange={(e) => onFormChange({ message: e.target.value })}
            />
          </label>
          {errors.message && (
            <p id="message-error" className="field-error" role="alert">
              {errors.message}
            </p>
          )}

          <PlanHelper {...plan} />

          <Button variant="campus" className="submit-button" type="submit">
            <MessageCircle /> Continue on WhatsApp <ArrowRight />
          </Button>
          <p className="form-privacy">
            <LockKeyhole aria-hidden="true" /> Nothing is sent until you send it on WhatsApp.
          </p>

          {sent && (
            <div className="enquiry-notice" role="status">
              <p>
                <strong>WhatsApp is opening with your enquiry ready to send.</strong>
                <br />
                If it didn’t open — or you’d like to send it again — tap below.
              </p>
              <div className="notice-actions">
                <Button variant="campus" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> Open WhatsApp
                  </a>
                </Button>
                <Button variant="campusLight" onClick={onCopy} type="button">
                  {copied ? (
                    <>
                      <Check /> Enquiry copied
                    </>
                  ) : (
                    "Copy my enquiry"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
