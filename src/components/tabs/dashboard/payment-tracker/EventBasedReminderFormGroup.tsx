import { FormGroup, FormikValidation } from "@/components/form";
import { EventTrigger, OffsetRange } from "@/enums";

export const EventBasedReminderFormGroup = ({
  validation,
}: {
  validation: FormikValidation;
}) => {
  return (
    <>
      <FormGroup
        type="date-time"
        name="eventDate"
        groupLabel="Reminder event date"
        placeholder="Pick an event date. e.g. A payment due date"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="Reminder date trigger(BEFORE, ON, AFTER) will be based on this event date."
      />
      <FormGroup
        type="select"
        name="eventTrigger"
        groupLabel="Event trigger"
        placeholder="Select an event trigger"
        size="md"
        validation={validation}
        options={Object.values(EventTrigger)}
        containerClassName="gap-2 mt-4"
        info="Select an event trigger for the reminder."
      />
      <FormGroup
        type="select"
        name="offsetRange"
        groupLabel="Offset range"
        placeholder="Select an offset range"
        size="md"
        validation={validation}
        options={Object.values(OffsetRange)}
        containerClassName="gap-2 mt-4"
        info="Select an offset range for the reminder."
      />
      <FormGroup
        type="text"
        name="triggerOffset"
        groupLabel="Trigger offset"
        placeholder="Enter a trigger offset (number). e.g. 2"
        size="md"
        validation={validation}
        containerClassName="gap-2 mt-4"
        info="e.g. If event trigger is (BEFORE), offset range is (DAYS), and trigger offset is 2, reminder is sent 2 days before the event date."
      />
    </>
  );
};
