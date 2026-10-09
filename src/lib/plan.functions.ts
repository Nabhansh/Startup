import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const CONTROL_CHARS = /\p{Cc}/gu;
const clean = (value: string) => value.replace(CONTROL_CHARS, " ");

const schema = z.object({
  branch: z.string().trim().min(1).max(80).transform(clean),
  year: z.string().trim().min(1).max(30).transform(clean),
  subjects: z.string().trim().min(1).max(300).transform(clean),
  goals: z.string().trim().min(1).max(800).transform(clean),
});

function clientKey(): string {
  // Netlify sets this header at the edge; visitors cannot spoof it.
  const netlifyIp = getRequestHeader("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp;
  const forwarded = getRequestHeader("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export const recommendPlan = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { limitPlanRequest } = await import("./rate-limit-store.server");
    const verdict = await limitPlanRequest(clientKey());
    if (verdict === "client") {
      return {
        plan: null,
        error: "Lots of students are asking right now — please try again in a few minutes.",
      };
    }
    if (verdict === "daily") {
      return {
        plan: null,
        error:
          "The plan helper has reached its limit for today. You can still send your enquiry on WhatsApp.",
      };
    }

    const { generatePlan, PlanError } = await import("./plan.server");
    try {
      return { plan: await generatePlan(data), error: null as string | null };
    } catch (error) {
      console.error("plan error", error);
      return {
        plan: null,
        error:
          error instanceof PlanError
            ? error.message
            : "Couldn't create a plan right now. Please try again shortly.",
      };
    }
  });
