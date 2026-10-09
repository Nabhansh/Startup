import type { ReactElement } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  useServerFn: () => vi.fn(async () => ({ plan: null, error: "Not available in tests" })),
}));
vi.mock("@/lib/plan.functions", () => ({ recommendPlan: vi.fn() }));

const { Route } = await import("@/routes/index");
const Page = Route.options.component as () => ReactElement;

function renderPage() {
  return render(<Page />);
}

describe("landing page", () => {
  beforeEach(() => {
    window.open = vi.fn() as unknown as typeof window.open;
  });
  afterEach(() => vi.restoreAllMocks());

  it("has a skip link, a single main landmark and one top-level heading", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no detectable accessibility violations (contrast is checked separately)", async () => {
    const { container } = renderPage();
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

  it("fills the subject field when a subject card is chosen", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Enquire about Physics" }));
    expect(screen.getByLabelText(/Your subject/)).toHaveValue("Physics");
  });

  it("blocks the WhatsApp hand-off and explains what is missing", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /Continue on WhatsApp/ }));
    expect(screen.getByText("Please add your name.")).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with the enquiry pre-filled once the form is valid", () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: "Asha" } });
    fireEvent.click(screen.getByRole("button", { name: "Enquire about Physics" }));
    fireEvent.click(screen.getByRole("button", { name: /Continue on WhatsApp/ }));

    expect(window.open).toHaveBeenCalledTimes(1);
    const [url = "", target, features = ""] = (window.open as unknown as ReturnType<typeof vi.fn>)
      .mock.calls[0] as string[];
    expect(url.startsWith("https://wa.me/919423533691?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain(
      "Name: Asha\nYear: 1st year\nSubject: Physics",
    );
    expect(target).toBe("_blank");
    expect(features).toContain("noopener");
  });

  it("limits field lengths in the markup as well as in validation", () => {
    renderPage();
    expect(screen.getByLabelText(/Your name/)).toHaveAttribute("maxLength", "80");
    expect(screen.getByLabelText(/Your subject/)).toHaveAttribute("maxLength", "120");
    expect(screen.getByLabelText(/Anything else/)).toHaveAttribute("maxLength", "600");
  });

  it("asks for subject and goals before requesting a plan", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Suggest my plan" }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Add your subject above and a line about your goals first.",
      ),
    );
  });
});
