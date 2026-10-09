import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PlanHelperProps = {
  branch: string;
  onBranchChange: (branch: string) => void;
  goals: string;
  onGoalsChange: (goals: string) => void;
  plan: string | null;
  planBusy: boolean;
  planError: string | null;
  includePlan: boolean;
  onIncludePlanChange: (include: boolean) => void;
  onAskPlan: () => void;
};

export function PlanHelper(props: PlanHelperProps) {
  const {
    branch,
    onBranchChange,
    goals,
    onGoalsChange,
    plan,
    planBusy,
    planError,
    includePlan,
    onIncludePlanChange,
    onAskPlan,
  } = props;
  return (
    <fieldset className="planner">
      <legend className="sr-only">Suggested tutoring plan (optional)</legend>
      <div className="planner-head">
        <Sparkles aria-hidden="true" />
        <div>
          <strong>Not sure where to start?</strong>
          <small>Get a suggested tutoring plan, then send it with your enquiry.</small>
        </div>
      </div>
      <label>
        Branch
        <select value={branch} onChange={(e) => onBranchChange(e.target.value)}>
          <option>Computer Science &amp; Engineering</option>
          <option>Aerospace Engineering</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        Your goals
        <textarea
          rows={2}
          maxLength={800}
          placeholder="e.g. Clear my DSA basics before mid-sems in 3 weeks"
          value={goals}
          onChange={(e) => onGoalsChange(e.target.value)}
        />
      </label>
      <Button variant="campusLight" type="button" onClick={onAskPlan} disabled={planBusy}>
        {planBusy ? "Building your plan…" : plan ? "Suggest a new plan" : "Suggest my plan"}
      </Button>
      {planError && (
        <p className="planner-error" role="alert">
          {planError}
        </p>
      )}
      {plan && (
        <div className="planner-result" aria-live="polite">
          <pre>{plan}</pre>
          <label className="planner-include">
            <input
              type="checkbox"
              checked={includePlan}
              onChange={(e) => onIncludePlanChange(e.target.checked)}
            />{" "}
            Include this plan in my WhatsApp enquiry
          </label>
          <small>AI-suggested starting point — your tutor will adjust it with you.</small>
        </div>
      )}
    </fieldset>
  );
}
