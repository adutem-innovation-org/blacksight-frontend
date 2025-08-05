/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Button,
  clearTempSession,
  FormGroup,
  getTempData,
  InfoBlock,
  ResendOtp,
  Spinner,
} from "@/components";
import { useRetryTimeout, useStore } from "@/hooks";
import { VerifyMfaCodeBody } from "@/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  resetSendMfaCode,
  resetVerifyMfaCode,
  sendMfaCode,
  verifyMfaCode,
} from "@/store";
import toast from "react-hot-toast";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";
import { MFAMethods } from "@/enums";
import { cn } from "@/lib/utils";
import { AuthApiService } from "@/apis";

export const MfaVerification = () => {
  const navigate = useNavigate();
  const { dispatch, getState } = useStore();
  const [hasAttemptedResend, setHasAttemptedResend] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<MFAMethods | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const tempAuthData = getTempData();
    if (tempAuthData) {
      return Math.max(0, tempAuthData.expiresAt - Date.now());
    }
    return null;
  });

  // Internal state to track if we've sent code for current method
  const [hasCodeBeenSent, setHasCodeBeenSent] = useState(false);

  const location = useLocation();

  const {
    verifyingMfaCode,
    mfaCodeVerified,
    verifyMfaCodeErrorMessage,
    verifyMfaCodeErrors,

    // Send otp
    sendingMfaCode,
    mfaCodeSent,
    sendMfaCodeErrorMessage,
  } = getState("Auth");

  const initialValues: any = {
    code: "",
    method: "",
  };

  // Validation schema for email and SMS verification
  const verifyMfaCodeSchema = yup.object({
    code: yup
      .string()
      .required("Please provide verification code")
      .length(6, "Verification code must be 6 characters long")
      .matches(
        /^\d+$/,
        "Verification code should only contain numeric characters"
      ),
    method: yup
      .string()
      .required("Please select a verification method")
      .oneOf(Object.values(MFAMethods), "Invalid verification method"),
  });

  const validation = useFormik<VerifyMfaCodeBody>({
    enableReinitialize: true,
    initialValues,
    validationSchema: verifyMfaCodeSchema,
    onSubmit: (values) => {
      if (!selectedMethod) return;
      dispatch(verifyMfaCode(values));
    },
  });

  const { minutes, seconds, resetRetryTimeout } = useRetryTimeout();

  const sendInitialCode = () => {
    if (!selectedMethod) return;
    resetRetryTimeout();
    setHasCodeBeenSent(true);
    dispatch(sendMfaCode({ method: selectedMethod }));
  };

  const resendOtp = () => {
    resetRetryTimeout();
    setHasAttemptedResend(true);
    if (!selectedMethod) return;
    dispatch(sendMfaCode({ method: selectedMethod }));
  };

  useEffect(() => {
    if (mfaCodeVerified) {
      dispatch(resetVerifyMfaCode());
      // Navigate to appropriate page after successful 2FA
      const redirectTo = location.state?.redirectTo || "/dashboard";
      navigate(redirectTo, { replace: true });
      clearTempSession();
    }
  }, [mfaCodeVerified, location.state?.redirectTo]);

  useEffect(() => {
    if (verifyMfaCodeErrorMessage) {
      toast.error(verifyMfaCodeErrorMessage);
      if (verifyMfaCodeErrors) {
        validation.setErrors(verifyMfaCodeErrors);
      }
      dispatch(resetVerifyMfaCode());
    }
  }, [verifyMfaCodeErrorMessage]);

  const { handleSubmit, values, resetForm } = validation;

  useEffect(() => {
    if (mfaCodeSent && hasAttemptedResend) {
      const methodText =
        selectedMethod === MFAMethods.EMAIL ? "email" : "phone";
      toast.success(`A verification code has been sent to your ${methodText}`);
    }
  }, [mfaCodeSent, hasAttemptedResend, selectedMethod]);

  useEffect(() => {
    if (sendMfaCodeErrorMessage) {
      toast.error(sendMfaCodeErrorMessage);
      const tmo = setTimeout(() => {
        dispatch(resetSendMfaCode());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [sendMfaCodeErrorMessage]);

  const mfaMethods = useMemo(() => {
    const availableMethods = (location.state?.mfaMethods as MFAMethods[]) || [];
    // Filter out backup codes for now
    const emailAndSmsMethods = availableMethods.filter(
      (method: MFAMethods) =>
        method === MFAMethods.EMAIL || method === MFAMethods.SMS
    );

    const hasMultipleMethods = emailAndSmsMethods.length > 1;
    const hasOnlyEmail =
      emailAndSmsMethods.length === 1 &&
      emailAndSmsMethods[0] === MFAMethods.EMAIL;
    const hasOnlySms =
      emailAndSmsMethods.length === 1 &&
      emailAndSmsMethods[0] === MFAMethods.SMS;

    return {
      availableMethods: emailAndSmsMethods,
      hasMultipleMethods,
      hasOnlyEmail,
      hasOnlySms,
    };
  }, [location.state?.mfaMethods]);

  // Auto-select method if only one is available AND auto-send
  useEffect(() => {
    if (!selectedMethod && mfaMethods.availableMethods.length === 1) {
      const method = mfaMethods.availableMethods[0];
      setSelectedMethod(method);
      setHasCodeBeenSent(true);
      dispatch(sendMfaCode({ method }));
    }
  }, [selectedMethod, mfaMethods.availableMethods]);

  useEffect(() => {
    if (selectedMethod) {
      validation.setFieldValue("method", selectedMethod);
    }
  }, [selectedMethod]);

  // Reset internal sent state when method changes
  const handleMethodChange = (method: MFAMethods) => {
    setSelectedMethod(method);
    resetForm();
    setHasAttemptedResend(false);
    setHasCodeBeenSent(false); // Reset sent state for new method
  };

  // Determine button text and action
  const getButtonConfig = () => {
    if (!selectedMethod) {
      return { text: "Select Method", disabled: true, action: null };
    }

    if (!hasCodeBeenSent) {
      return {
        text: "Send Verification Code",
        disabled: sendingMfaCode,
        action: sendInitialCode,
      };
    }

    return {
      text: "Verify",
      disabled: verifyingMfaCode || sendingMfaCode || !values.code,
      action: handleSubmit,
    };
  };

  const buttonConfig = getButtonConfig();

  const getMethodDisplayName = (method: MFAMethods) => {
    switch (method) {
      case MFAMethods.EMAIL:
        return "Email";
      case MFAMethods.SMS:
        return "SMS";
      default:
        return method;
    }
  };

  const getMethodDescription = (method: MFAMethods) => {
    switch (method) {
      case MFAMethods.EMAIL:
        return "A code will be sent to your email address.";
      case MFAMethods.SMS:
        return "A code will be sent to your phone number.";
      default:
        return "Enter your verification code to continue.";
    }
  };

  const getMethodIconClass = (method: MFAMethods) => {
    switch (method) {
      case MFAMethods.EMAIL:
        return "fi fi-rr-envelope";
      case MFAMethods.SMS:
        return "fi fi-rr-paper-plane";
      default:
        return "fi fi-rr-paper-plane";
    }
  };

  const getInstructionText = (method: MFAMethods) => {
    switch (method) {
      case MFAMethods.EMAIL:
        return "We've sent a 6-digit verification code to your email address.";
      case MFAMethods.SMS:
        return "We've sent a 6-digit verification code to your phone number.";
      default:
        return "Enter your verification code to continue.";
    }
  };

  const redirectToLogin = () => {
    console.log("I was called");
    clearTempSession();
    return navigate("/user/signin", { replace: true });
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authApiService = AuthApiService.getInstance();
        const data = await authApiService.checkTempAuth();

        // Check if close to expiration (e.g., less than 1 minute)
        if (data.timeRemaining < 60000) {
          toast.success("This session will expire in 1 min.", {
            iconTheme: {
              primary: "#1a5f82",
              secondary: "#fff",
            },
            duration: 5000,
            position: "top-center",
            style: {
              color: "#1a5f82",
            },
          });
        }

        // Set up countdown timer
        setTimeRemaining(data.timeRemaining);
      } catch (error) {
        redirectToLogin();
      }
    };

    // Check status on component mount and page refresh
    checkAuthStatus();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining === null) {
      redirectToLogin();
      return;
    }

    if (timeRemaining <= 0) {
      redirectToLogin();
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining((prev) => (prev || 0) - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  if (!location.state?.requiresMFA || !location.state?.mfaMethods) {
    redirectToLogin();
  }

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img
          src={blacksightLogo}
          className="max-h-10 object-contain"
          alt="Blacksight Logo"
        />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Two-Factor Authentication
          </h1>
          <p className="text-center text-sm">
            {selectedMethod && hasCodeBeenSent
              ? getInstructionText(selectedMethod)
              : selectedMethod
              ? `Click "Send Verification Code" to receive your code via ${getMethodDisplayName(
                  selectedMethod
                ).toLowerCase()}.`
              : "Please select how you'd like to receive your verification code."}
          </p>
        </div>

        {/* Method Selection */}
        {mfaMethods.hasMultipleMethods && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">
              Choose verification method:
            </p>
            <div className="flex flex-col gap-2">
              {mfaMethods.availableMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleMethodChange(method)}
                  className={`p-3 pl-5 rounded-lg border text-left transition-colors flex gap-4 items-center ${
                    selectedMethod === method
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  disabled={verifyingMfaCode || sendingMfaCode}
                >
                  <div>
                    <i
                      className={cn(
                        getMethodIconClass(method),
                        "flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
                      )}
                    ></i>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-medium">
                      {getMethodDisplayName(method)}
                    </h4>
                    <p className="text-sm tracking-tight">
                      {getMethodDescription(method)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {mfaCodeSent && !sendMfaCodeErrorMessage && hasCodeBeenSent && (
          <InfoBlock variant={"success"}>
            {selectedMethod === MFAMethods.EMAIL
              ? "A verification code has been sent to your email."
              : "A verification code has been sent to your phone."}
          </InfoBlock>
        )}
        {sendMfaCodeErrorMessage && (
          <InfoBlock variant={"error"}>{sendMfaCodeErrorMessage}</InfoBlock>
        )}

        {/* Verification Form */}
        {selectedMethod && (
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (buttonConfig.action) {
                buttonConfig.action();
              }
              return false;
            }}
          >
            {/* Only show code input after code has been sent */}
            {hasCodeBeenSent && (
              <>
                <FormGroup
                  type="text"
                  groupLabel="Verification Code"
                  placeholder="Enter 6-digit verification code"
                  size="lg"
                  name="code"
                  disabled={verifyingMfaCode || sendingMfaCode}
                  validation={validation}
                  maxLength={6}
                />

                {/* Resend OTP - only show after initial code sent */}
                <ResendOtp
                  minutes={minutes}
                  seconds={seconds}
                  disabled={verifyingMfaCode || sendingMfaCode}
                  resendOtp={resendOtp}
                  loading={sendingMfaCode}
                />
              </>
            )}

            {verifyMfaCodeErrorMessage && (
              <InfoBlock variant={"error"} className="mt-4">
                {verifyMfaCodeErrorMessage}
              </InfoBlock>
            )}

            <Button
              className="w-full cursor-pointer mt-6"
              variant={"default"}
              size={"md"}
              disabled={buttonConfig.disabled}
              onClick={() => buttonConfig.action && buttonConfig.action()}
              type="button"
            >
              {sendingMfaCode || verifyingMfaCode ? (
                <Spinner type="form" />
              ) : (
                buttonConfig.text
              )}
            </Button>
          </form>
        )}
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
