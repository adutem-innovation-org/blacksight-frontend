import { Button, FormGroup, InfoBlock, ResendOtp, Spinner } from "@/components";
import { useRetryTimeout, useStore } from "@/hooks";
import { ResetPasswordBody } from "@/interfaces";
import React, { useEffect } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailRegex, passwordRegex } from "@/constants";
import toast from "react-hot-toast";
import {
  forgotPassword,
  resetForgotPassword,
  resetPassword,
  resetPasswordReset,
} from "@/store";
import { UserTypes } from "@/enums";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams() as { basePath: UserTypes };
  const { dispatch, getState } = useStore();
  const { minutes, seconds, resetRetryTimeout } = useRetryTimeout();

  const {
    recoveryOtpSent,
    sendRecoveryOtpErrorMessage,
    sendingRecoveryOtp,

    // Reset password
    resettingPassword,
    passwordReset,
    resetPasswordErrors,
    resetPasswordErrorMessage,
  } = getState("Auth");

  const initialValues = {
    code: "",
    email: location.state.email || "",
    password: "",
    confirmPassword: "",
  };

  const resetPasswordSchema = yup.object({
    code: yup
      .string()
      .required("Please provide reset codee")
      .length(6, "OTP must be 6 characters long")
      .matches(/^\d+$/, "OTP should only contain numeric characters"),
    email: yup
      .string()
      .required("Please enter your email")
      .matches(emailRegex, "Invalid email"),
    password: yup
      .string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, a number and special character."
      ),
    confirmPassword: yup
      .string()
      .required("Please enter password again")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const { handleBlur, handleChange, handleSubmit, values, ...validation } =
    useFormik<ResetPasswordBody & { confirmPassword: string }>({
      enableReinitialize: false,
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values) => {
        dispatch(resetPassword({ userTypes: params.basePath, body: values }));
      },
    });

  const resendOtp = () => {
    resetRetryTimeout();
    dispatch(
      forgotPassword({
        userType: params.basePath,
        body: { email: location.state.email },
      })
    );
  };

  useEffect(() => {
    if (recoveryOtpSent) {
      toast.success("A verification code has been sent to your email");
    }
  }, [recoveryOtpSent]);

  useEffect(() => {
    if (sendRecoveryOtpErrorMessage) {
      toast.error(sendRecoveryOtpErrorMessage);
      let tmo = setTimeout(() => {
        dispatch(resetForgotPassword());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [sendRecoveryOtpErrorMessage]);

  useEffect(() => {
    if (passwordReset) {
      toast.success("Password reset successful");
      dispatch(resetPasswordReset());
      navigate(`/${params.basePath}/signin`, { replace: true });
    }
  }, [passwordReset]);

  useEffect(() => {
    if (resetPasswordErrorMessage) {
      toast.error(resetPasswordErrorMessage);
      if (resetPasswordErrors) {
        validation.setErrors(resetPasswordErrors);
      }
      let tmo = setTimeout(() => {
        dispatch(resetPasswordReset());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [resetPasswordErrorMessage]);

  if (!location.state.email) {
    return (
      <Navigate to={`/${params.basePath}/forgot-password`} replace={true} />
    );
  }

  return (
    <React.Fragment>
      <div className="flex items-center gap-4">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/philipthedeveloper-p.appspot.com/o/blacksight%2Fblacksight-rs.jpg?alt=media&token=cac59c0d-afb6-42f5-829a-e590555a4ed8"
          className="w-12 h-12 rounded-full"
        />
        <p className="font-semibold text-lg text-blue-900">Blacksight</p>
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Reset Password
          </h1>
          <p className="text-center text-sm">Reset your blacksight password</p>
        </div>

        {recoveryOtpSent && (
          <InfoBlock variant={"success"} className="mt-5">
            A verification code has been sent to your email.
          </InfoBlock>
        )}
        {sendRecoveryOtpErrorMessage && (
          <InfoBlock variant={"error"} className="mt-5">
            {sendRecoveryOtpErrorMessage}
          </InfoBlock>
        )}

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
            disabled={true}
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            validation={validation}
          />
          <FormGroup
            type="text"
            name="code"
            groupLabel="Enter verification code"
            placeholder="Enter code"
            size="lg"
            disabled={resettingPassword || sendingRecoveryOtp}
            value={values.code}
            onBlur={handleBlur}
            onChange={handleChange}
            validation={validation}
            maxLength={6}
          />
          <FormGroup
            type="password"
            name="password"
            groupLabel="New password"
            placeholder="Enter password"
            size="lg"
            disabled={resettingPassword || sendingRecoveryOtp}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            validation={validation}
          />
          <FormGroup
            type="password"
            name="confirmPassword"
            groupLabel="Confirm new password"
            placeholder="Enter password"
            size="lg"
            disabled={resettingPassword || sendingRecoveryOtp}
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            validation={validation}
          />

          <ResendOtp
            minutes={minutes}
            seconds={seconds}
            disabled={resettingPassword || sendingRecoveryOtp}
            resendOtp={resendOtp}
            loading={sendingRecoveryOtp}
          />

          {resetPasswordErrorMessage && (
            <InfoBlock variant={"error"} className="mt-8">
              {resetPasswordErrorMessage}
            </InfoBlock>
          )}

          <Button
            className="w-full cursor-pointer mt-8"
            variant={"default"}
            size={"md"}
            disabled={resettingPassword || sendingRecoveryOtp}
          >
            {resettingPassword ? <Spinner type="form" /> : "Reset password"}
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
