import { describe, expect, it } from "vitest";
import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  ENQUIRY_LIMITS,
  validateEnquiry,
  type EnquiryForm,
} from "./enquiry";

const base: EnquiryForm = {
  name: "Asha",
  year: "2nd year",
  mode: "Online",
  subject: "Physics",
  message: "",
};

describe("validateEnquiry", () => {
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(base)).toEqual({});
  });

  it("requires a name and a subject, ignoring surrounding spaces", () => {
    const errors = validateEnquiry({ ...base, name: "   ", subject: "" });
    expect(errors.name).toBeTruthy();
    expect(errors.subject).toBeTruthy();
  });

  it("rejects values over their length limits", () => {
    const errors = validateEnquiry({
      ...base,
      name: "x".repeat(ENQUIRY_LIMITS.name + 1),
      subject: "y".repeat(ENQUIRY_LIMITS.subject + 1),
      message: "z".repeat(ENQUIRY_LIMITS.message + 1),
    });
    expect(Object.keys(errors).sort()).toEqual(["message", "name", "subject"]);
  });
});

describe("buildEnquiryMessage", () => {
  it("includes the plan only when it exists and the student kept it", () => {
    const withPlan = buildEnquiryMessage({
      form: base,
      branch: "CSE",
      goals: "DSA",
      plan: "Focus: arrays",
      includePlan: true,
    });
    expect(withPlan).toContain("Suggested plan:\nFocus: arrays");
    const withoutPlan = buildEnquiryMessage({
      form: base,
      branch: "CSE",
      goals: "DSA",
      plan: "Focus: arrays",
      includePlan: false,
    });
    expect(withoutPlan).not.toContain("Suggested plan");
  });

  it("trims user text and omits empty details", () => {
    const message = buildEnquiryMessage({
      form: { ...base, name: "  Asha  ", message: "   " },
      branch: "CSE",
      goals: "",
      plan: null,
      includePlan: true,
    });
    expect(message).toContain("Name: Asha\n");
    expect(message).not.toContain("Details:");
  });
});

describe("buildWhatsAppUrl", () => {
  it("encodes the message into a wa.me link", () => {
    const url = buildWhatsAppUrl("Hi & bye");
    expect(url.startsWith("https://wa.me/919423533691?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toBe("Hi & bye");
  });
});
