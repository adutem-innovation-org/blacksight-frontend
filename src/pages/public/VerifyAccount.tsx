/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, FormGroup, InfoBlock, ResendOtp, Spinner } from "@/components";
import { useRetryTimeout, useStore } from "@/hooks";
import { VerifyEmailBody } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetSendOtp, resetVerifyEmail, sendOtp, verifyEmail } from "@/store";
import toast from "react-hot-toast";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";

export const VerifyAccount = () => {
  const navigate = useNavigate();
  const { dispatch, getState } = useStore();
  const [hasAttemptedResend, setHasAttemptedResend] = useState(false);

  const {
    verifyingEmail,
    emailVerified,
    verifyEmailErrorMessage,
    verifyEmailErrors,

    // Send otp
    sendingOtp,
    otpSent,
    sendOtpErrorMessage,
  } = getState("Auth");

  const initialValues: VerifyEmailBody = {
    otp: "",
  };

  const verifyEmailSchema = yup.object({
    otp: yup
      .string()
      .required("Please provide verification code")
      .length(6, "OTP must be 6 characters long")
      .matches(/^\d+$/, "OTP should only contain numeric characters"),
  });

  const validation = useFormik<VerifyEmailBody>({
    enableReinitialize: false,
    initialValues,
    validationSchema: verifyEmailSchema,
    onSubmit: (values) => {
      dispatch(verifyEmail(values));
    },
  });

  const { minutes, seconds, resetRetryTimeout } = useRetryTimeout();

  const resendOtp = () => {
    resetRetryTimeout();
    setHasAttemptedResend(true);
    dispatch(sendOtp());
  };

  useEffect(() => {
    if (emailVerified) {
      dispatch(resetVerifyEmail());
      navigate("/dashboard", { replace: true });
    }
  }, [emailVerified]);

  useEffect(() => {
    if (verifyEmailErrorMessage) {
      toast.error(verifyEmailErrorMessage);
      if (verifyEmailErrors) {
        validation.setErrors(verifyEmailErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetVerifyEmail());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [verifyEmailErrorMessage]);

  const { handleChange, handleBlur, handleSubmit, values } = validation;

  useEffect(() => {
    if (otpSent && hasAttemptedResend) {
      toast.success("A verification code has been sent to your email");
    }
  }, [otpSent]);

  useEffect(() => {
    if (sendOtpErrorMessage) {
      toast.error(sendOtpErrorMessage);
      const tmo = setTimeout(() => {
        dispatch(resetSendOtp());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [sendOtpErrorMessage]);

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img src={blacksightLogo} className="max-h-10 object-contain" />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Verify your account
          </h1>
          <p className="text-center text-sm">
            Verify your account to continue to blacksight.
          </p>
        </div>
        <div className="flex items-center justify-center my-2">
          {/* @ts-ignore */}
          <lord-icon
            src="https://cdn.lordicon.com/ozlkyfxg.json"
            trigger="loop"
            colors="primary:#1c398e,secondary:#1c398e"
            classname="avatar-xl"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
        {otpSent && !sendOtpErrorMessage && (
          <InfoBlock variant={"success"}>
            A verification code has been sent to your email.
          </InfoBlock>
        )}
        {sendOtpErrorMessage && (
          <InfoBlock variant={"error"}>{sendOtpErrorMessage}</InfoBlock>
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
            groupLabel="Enter code"
            placeholder="Enter verification code"
            size="lg"
            name="otp"
            disabled={verifyingEmail || sendingOtp}
            validation={validation}
            maxLength={6}
          />

          <ResendOtp
            minutes={minutes}
            seconds={seconds}
            disabled={verifyingEmail || sendingOtp}
            resendOtp={resendOtp}
            loading={sendingOtp}
          />

          {verifyEmailErrorMessage && (
            <InfoBlock variant={"error"} className="mt-8">
              {verifyEmailErrorMessage}
            </InfoBlock>
          )}

          <Button
            className="w-full cursor-pointer mt-8"
            variant={"default"}
            size={"md"}
            disabled={verifyingEmail || sendingOtp}
          >
            {verifyingEmail ? <Spinner type="form" /> : "Verify account"}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-600 font-medium">Need help?</p>
          <Link to={"/faqs"} className="text-sm text-blue-900 font-semibold">
            Click here
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
