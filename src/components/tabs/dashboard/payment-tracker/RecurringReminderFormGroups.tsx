import { FormGroup, FormikValidation } from "@/components/form";
import { RecurrencePattern } from "@/enums";

const RECURRENCE_PATTERN_OPTIONS = Object.values(RecurrencePattern);
RECURRENCE_PATTERN_OPTIONS.pop();

export const RecurringReminderFormGroups = ({
  validation,
}: {
  validation: FormikValidation;
}) => {
  console.log("Should be in view now");

  return (
    <>
      <FormGroup
        type="select"
        name="recurrencePattern"
        groupLabel="Recurrence Pattern"
        placeholder="Select a recurrence pattern"
        size="md"
        validation={validation}
        options={RECURRENCE_PATTERN_OPTIONS}
        containerClassName="gap-2 mt-4"
        info="Select a recurrence pattern for the reminder."
      />
      {validation.values.recurrencePattern.includes("every_n") && (
        <FormGroup
          type="text"
          name="recurrenceInterval"
          groupLabel="Recurrence interval"
          placeholder="Enter a number"
          size="md"
          validation={validation}
          containerClassName="gap-2 mt-4"
          info="Enter a number for the recurrence interval."
        />
      )}
      <FormGroup
        type="date-time"
        name="startDate"
        groupLabel="Reminder start date"
        placeholder="Pick a date to start sending this reminder"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="Reminder will start being sent from this day, followed by every (n) day you have set."
      />
      <FormGroup
        type="date-time"
        name="endDate"
        groupLabel="Reminder end date (optional)"
        placeholder="Pick a date to stop sending this reminder"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="Reminder will stop being sent on this day. Reminder will never stop being sent if no end date is set."
      />
      <FormGroup
        type="text"
        name="maxExecutions"
        groupLabel="Max executions (optional)"
        placeholder="Enter a number"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="Reminder will stop being sent after this many executions. Reminder will never stop being sent if no max executions or end date is set."
      />
    </>
  );
};
