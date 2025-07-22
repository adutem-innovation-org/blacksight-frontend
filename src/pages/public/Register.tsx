import { Button, FormGroup, InfoBlock, Spinner } from "@/components";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import googleIcon from "@/assets/images/google.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGoogleAuth, useStore } from "@/hooks";
import { emailRegex, passwordRegex } from "@/constants";
import { RegisterUserBody } from "@/interfaces";
import { resetContinueWithGoogle, resetSignUpUser, signUpUser } from "@/store";
import { UserTypes } from "@/enums";
import { getAuthUser } from "@/helpers";
import toast from "react-hot-toast";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";

export const Register = () => {
  const navigate = useNavigate();
  const params = useParams() as { basePath: UserTypes };

  const { dispatch, getState } = useStore();
  const { googleLogin, gettingOauthData } = useGoogleAuth();

  const {
    isSignedUp,
    signUpErrors,
    signUpErrorMessage,
    signingUp,
    gapiReady,
    authenticatingWithGoogle,
    googleAuthSuccess,
    googleAuthErrorMessage,
    googleAuthErrors,
  } = getState("Auth");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const registerSchema = yup.object({
    firstName: yup.string().required("Please provide first name"),
    lastName: yup.string().required("Please provide last name"),
    email: yup
      .string()
      .required("Please enter email")
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

  const validation = useFormik<RegisterUserBody & { confirmPassword: string }>({
    enableReinitialize: false,
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(signUpUser(values));
    },
  });

  // Successful authentication
  useEffect(() => {
    const handleSignupSuccessful = () => {
      if (isSignedUp) {
        dispatch(resetSignUpUser());
        const user = getAuthUser();
        if (user) {
          if (user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          if (!user.isEmailVerified) return navigate("/user/verify-email");
          if (!user.isOnboarded && !user.skippedOnboarding)
            return navigate(`/onboard`);
          return navigate("/dashboard", { replace: true });
        }
      }
    };

    handleSignupSuccessful();
  }, [isSignedUp]);

  useEffect(() => {
    const handleSignupSuccessful = () => {
      if (googleAuthSuccess) {
        dispatch(resetContinueWithGoogle());
        const user = getAuthUser();
        if (user) {
          if (user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          if (!user.isEmailVerified) return navigate("/user/verify-email");
          if (!user.isOnboarded && !user.skippedOnboarding)
            return navigate(`/onboard`);
          return navigate("/dashboard", { replace: true });
        }
      }
    };

    handleSignupSuccessful();
  }, [googleAuthSuccess]);

  // Failed authentication
  useEffect(() => {
    if (signUpErrorMessage) {
      toast.error(signUpErrorMessage);
      if (signUpErrors) {
        validation.setErrors(signUpErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetSignUpUser());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [signUpErrorMessage]);

  useEffect(() => {
    if (googleAuthErrorMessage) {
      toast.error(googleAuthErrorMessage);
      if (googleAuthErrors) {
        validation.setErrors(googleAuthErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetContinueWithGoogle());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [googleAuthErrorMessage]);

  const { handleChange, handleBlur, values } = validation;

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img src={blacksightLogo} className="max-h-10 object-contain" />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Create New Account
          </h1>
          <p className="text-center text-sm">Get your Free Business Account</p>
        </div>

        <form
          className="pt-8 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <FormGroup
            type="text"
            groupLabel="First name"
            placeholder="Enter your first name"
            size="lg"
            name="firstName"
            disabled={signingUp || authenticatingWithGoogle}
            validation={validation}
          />
          <FormGroup
            type="text"
            groupLabel="Last name"
            placeholder="Enter your last name"
            size="lg"
            name="lastName"
            disabled={signingUp || authenticatingWithGoogle}
            validation={validation}
          />
          <FormGroup
            type="text"
            groupLabel="Email"
            placeholder="Enter your email"
            size="lg"
            name="email"
            disabled={signingUp || authenticatingWithGoogle}
            validation={validation}
          />
          <FormGroup
            type="password"
            groupLabel="Password"
            placeholder="Enter your password"
            size="lg"
            name="password"
            disabled={signingUp || authenticatingWithGoogle}
            validation={validation}
          />
          <FormGroup
            type="password"
            groupLabel="Confirm Password"
            placeholder="Confirm password"
            size="lg"
            name="confirmPassword"
            disabled={signingUp || authenticatingWithGoogle}
            validation={validation}
          />

          {(signUpErrorMessage || googleAuthErrorMessage) && (
            <InfoBlock variant={"error"} className="mt-8">
              {signUpErrorMessage || googleAuthErrorMessage}
            </InfoBlock>
          )}

          <Button
            className="w-full cursor-pointer mt-10"
            variant={"default"}
            size={"md"}
            disabled={signingUp || gettingOauthData || authenticatingWithGoogle}
          >
            {signingUp ? <Spinner type="form" /> : "Sign Up"}
          </Button>
          {params.basePath === UserTypes.USER && (
            <Button
              className="w-full cursor-pointer mt-4 flex items-center gap-2"
              size={"md"}
              variant={"outline"}
              type="button"
              disabled={
                signingUp ||
                gettingOauthData ||
                !gapiReady ||
                authenticatingWithGoogle
              }
              onClick={() => googleLogin()}
            >
              <img src={googleIcon} className="w-6 h-6" />
              {authenticatingWithGoogle ? (
                <Spinner type="form" />
              ) : (
                "Sign In with Google"
              )}
            </Button>
          )}
        </form>
      </div>

      {/* Footer */}
      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-600 font-medium">
            Already have an account?
          </p>
          <Link
            aria-disabled={authenticatingWithGoogle || signingUp}
            to={`/${params.basePath}/signin`}
            className="text-sm text-blue-900 font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
