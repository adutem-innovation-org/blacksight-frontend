import { Button, FormGroup, InfoBlock, Spinner } from "@/components";
import { UserTypes } from "@/enums";
import { ForgotPasswordBody } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailRegex } from "@/constants";
import { useStore } from "@/hooks";
import { forgotPassword, resetForgotPassword } from "@/store";
import toast from "react-hot-toast";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const params = useParams() as { basePath: UserTypes };
  const [hasAttemptedSend, setHasAttemptedSend] = useState(false);

  const { dispatch, getState } = useStore();

  const {
    sendingRecoveryOtp,
    recoveryOtpSent,
    sendRecoveryOtpErrorMessage,
    sendRecoveryOtpErrors,
  } = getState("Auth");

  const initialValues: ForgotPasswordBody = {
    email: "",
  };

  const forgotPasswordSchema = yup.object({
    email: yup
      .string()
      .required("Please provide email")
      .matches(emailRegex, "Invalid email"),
  });

  const validation = useFormik<ForgotPasswordBody>({
    enableReinitialize: false,
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      setHasAttemptedSend(true);
      dispatch(forgotPassword({ userType: params.basePath, body: values }));
    },
  });

  const { handleBlur, handleChange, handleSubmit, values } = validation;

  useEffect(() => {
    dispatch(resetForgotPassword());
  }, []);

  useEffect(() => {
    if (recoveryOtpSent && hasAttemptedSend) {
      navigate(`/${params.basePath}/reset-password`, {
        state: { email: values.email },
      });
    }
  }, [recoveryOtpSent]);

  useEffect(() => {
    if (sendRecoveryOtpErrorMessage) {
      toast.error(sendRecoveryOtpErrorMessage);
      if (sendRecoveryOtpErrors) {
        validation.setErrors(sendRecoveryOtpErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetForgotPassword());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [sendRecoveryOtpErrorMessage]);

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img src={blacksightLogo} className="max-h-10 object-contain" />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Forgot Password?
          </h1>
          <p className="text-center text-sm">Reset your blacksight password</p>
        </div>
        <div className="flex items-center justify-center">
          {/* @ts-ignore */}
          <lord-icon
            src="https://cdn.lordicon.com/rhvddzym.json"
            trigger="loop"
            colors="primary:#1c398e,secondary:#1c398e"
            classname="avatar-xl"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
        <InfoBlock variant={"warning"}>
          Enter your email and a reset code will be sent to you!
        </InfoBlock>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            return false;
          }}
        >
          <FormGroup
            type="text"
            groupLabel="Email"
            placeholder="Enter your email"
            size="lg"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            validation={validation}
            value={values.email}
            disabled={sendingRecoveryOtp}
          />

          {sendRecoveryOtpErrorMessage && (
            <InfoBlock variant={"error"} className="mt-8">
              {sendRecoveryOtpErrorMessage}
            </InfoBlock>
          )}
          <Button
            className="w-full cursor-pointer mt-8"
            variant={"default"}
            size={"md"}
            disabled={sendingRecoveryOtp}
          >
            {sendingRecoveryOtp ? <Spinner type="form" /> : "Continue"}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-600 font-medium">
            Wait, I remember my password...
          </p>
          <Link
            to={`/${params.basePath}/signin`}
            className="text-sm text-blue-900 font-semibold"
          >
            Click here
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
