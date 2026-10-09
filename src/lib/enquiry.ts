import { WHATSAPP_NUMBER } from "@/content/landing";

export const ENQUIRY_LIMITS = { name: 80, subject: 120, message: 600 } as const;

export type EnquiryForm = {
  name: string;
  year: string;
  mode: string;
  subject: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<"name" | "subject" | "message", string>>;

export function validateEnquiry(form: EnquiryForm): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = form.name.trim();
  const subject = form.subject.trim();
  if (!name) errors.name = "Please add your name.";
  else if (name.length > ENQUIRY_LIMITS.name)
    errors.name = `Keep your name under ${ENQUIRY_LIMITS.name} characters.`;
  if (!subject) errors.subject = "Please add the subject you need help with.";
  else if (subject.length > ENQUIRY_LIMITS.subject)
    errors.subject = `Keep the subject under ${ENQUIRY_LIMITS.subject} characters.`;
  if (form.message.length > ENQUIRY_LIMITS.message)
    errors.message = `Keep your note under ${ENQUIRY_LIMITS.message} characters.`;
  return errors;
}

export function buildEnquiryMessage(input: {
  form: EnquiryForm;
  branch: string;
  goals: string;
  plan: string | null;
  includePlan: boolean;
}): string {
  const { form, branch, goals, plan, includePlan } = input;
  const planBlock =
    plan && includePlan ? `\nBranch: ${branch}\nGoals: ${goals}\n\nSuggested plan:\n${plan}` : "";
  const details = form.message.trim() ? `\nDetails: ${form.message.trim()}` : "";
  return `Hi CampusTutor, I’d like to enquire about tutoring.\nName: ${form.name.trim()}\nYear: ${form.year}\nSubject: ${form.subject.trim()}\nFormat: ${form.mode}${details}${planBlock}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
