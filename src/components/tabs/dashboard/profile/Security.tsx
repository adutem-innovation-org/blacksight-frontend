import { Button, FormGroup } from "@/components/form";
import { Loader } from "@/components/progress";
import { useProfile, useStore } from "@/hooks";
import { passwordUpdateSchema } from "@/schemas";
import { changePassword, resetChangePassword, setupPassword } from "@/store";
import { useFormik } from "formik";
import { Copy } from "lucide-react";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

type SecurityCardProps = {
  title: string;
  value?: string;
  hidden?: boolean;
};

const SecurityCard = ({ title, value, hidden }: SecurityCardProps) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <p className="font-dmsans tracking-tight">{title}</p>
      <div className="flex items-center gap-2">
        <span className="font-dmsans font-medium">{value}</span>
        <button className="text-brand cursor-pointer">
          <Copy />
        </button>
      </div>
    </div>
  );
};

export const Security = () => {
  const { dispatch, getState } = useStore();

  const {
    changingPassword,
    passwordChanged,
    changePasswordErrorMessage,
    changePasswordErrors,
  } = getState("Auth");
  const { user } = useProfile([passwordChanged]);

  const hasOldPassword = useMemo(() => user && user.passwordChangedAt, [user]);

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const { handleSubmit, ...validation } = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: passwordUpdateSchema(!!user?.passwordChangedAt),
    onSubmit: (values) => {
      const { password, oldPassword } = values;
      if (hasOldPassword)
        return dispatch(changePassword({ password, oldPassword }));
      return dispatch(setupPassword({ password }));
    },
  });

  useEffect(() => {
    if (passwordChanged) {
      toast.success("Password changed successfully");
      validation.resetForm();
      dispatch(resetChangePassword());
    }
  }, [passwordChanged]);

  useEffect(() => {
    if (changePasswordErrorMessage) {
      toast.error(changePasswordErrorMessage);
      if (Object.keys(changePasswordErrors ?? {}).length !== 0) {
        validation.setErrors(changePasswordErrors);
      }
      dispatch(resetChangePassword());
    }
  }, [changePasswordErrorMessage]);

  return (
    <div className="px-8 py-6 grid grid-cols-1 gap-15 lg:grid-cols-2 lg:gap-6 xl:gap-16 max-h-full overflow-auto">
      <div>
        {changingPassword && <Loader />}
        <div className="flex flex-col gap-6">
          {/* Tab Icon */}

          <div className="w-15 h-15 bg-brand/10 rounded-full flex items-center justify-center">
            <i className="fi fi-rr-lock text-2xl flex text-brand"></i>
          </div>
          <h4 className="font-semibold text-xl text-gray-800">
            {hasOldPassword ? "Change password" : "Setup your password"}
          </h4>

          <p>
            To change your password, please fill in the fields below.
            <br />
            Your password must contain at least 8 characters, it must also
            include at least one upper case letter, one lower case letter, one
            number and one special character.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            return false;
          }}
        >
          {hasOldPassword && (
            <FormGroup
              name="oldPassword"
              type="password"
              validation={validation}
              groupLabel="Current password"
              placeholder="Enter your current password"
            />
          )}
          <FormGroup
            name="password"
            type="password"
            validation={validation}
            groupLabel="New password"
            placeholder="Enter your desired password"
          />
          <FormGroup
            name="confirmPassword"
            type="password"
            validation={validation}
            groupLabel="Confirm new password"
            placeholder="Enter your new password again"
          />
          <Button
            className="w-full cursor-pointer mt-10 bg-brand"
            type="submit"
          >
            {hasOldPassword ? "Update password" : "Setup password"}
          </Button>
        </form>
      </div>

      <div>
        <div className="flex flex-col gap-6">
          {/* Tab Icon */}
          <div className="w-15 h-15 bg-brand/10 rounded-full flex items-center justify-center">
            <i className="fi fi-rr-key text-2xl flex text-brand"></i>
          </div>
          <h4 className="font-semibold text-xl text-gray-800">Api Key</h4>
          <p>
            API key is your gateway to accessing Blacksight API. Please keep
            safe
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <SecurityCard title="Blacksight App ID" value={user?.businessId} />
          <div className="flex flex-col gap-2 items-start">
            <SecurityCard
              title="API Key"
              value={`*************************************${user?.businessId.substring(
                24,
                29
              )}`}
              hidden
            />
            <Button variant={"outline"} size={"sm"}>
              Generate New Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
