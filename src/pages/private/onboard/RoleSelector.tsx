import { Button, RoleCard } from "@/components";
import { roles } from "@/constants";
import { UserRole } from "@/enums";
import { OnboardBusinessBody } from "@/interfaces";
import { FormikErrors, useFormik } from "formik";

interface RoleSelectorProps {
  proceed: () => void;
  userRole: UserRole;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<OnboardBusinessBody>>;
}

export const RoleSelector = ({
  userRole,
  proceed,
  setFieldValue,
}: RoleSelectorProps) => {
  return (
    <div className="flex flex-col gap-8 my-10">
      <h2 className="text-2xl text-gray-900 font-urbanist font-bold">
        What best describes your role?
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 auto-rows-[200px] gap-4">
        {roles.map((role) => (
          <RoleCard
            {...role}
            userRole={userRole}
            selectRole={(role: UserRole) => setFieldValue("role", role)}
          />
        ))}
      </div>

      <Button
        className="flex-1 w-50 self-center hover:bg-primary/80 duration-300"
        disabled={userRole === UserRole.UNSPECIFIED}
        onClick={proceed}
      >
        Continue
      </Button>
    </div>
  );
};
