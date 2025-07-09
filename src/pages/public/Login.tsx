import { Button, Checkbox, FormGroup, InfoBlock, Spinner } from "@/components";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import googleIcon from "@/assets/images/google.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailRegex, passwordRegex } from "@/constants";
import { LoginUserBody } from "@/interfaces";
import { useGoogleAuth, useStore } from "@/hooks";
import { resetContinueWithGoogle, resetSignInUser, signInUser } from "@/store";
import { UserTypes } from "@/enums";
import toast from "react-hot-toast";
import { getAuthUser } from "@/helpers";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";

export const Login = () => {
  const params = useParams() as { basePath: UserTypes };
  const navigate = useNavigate();
  const { dispatch, getState } = useStore();

  const {
    signingIn,
    isSignedIn,
    signInErrors,
    signInErrorMessage,
    gapiReady,
    authenticatingWithGoogle,
    googleAuthSuccess,
    googleAuthErrorMessage,
    googleAuthErrors,
  } = getState("Auth");

  const { googleLogin, gettingOauthData } = useGoogleAuth();

  const defaultValues = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object({
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
  });

  const validation = useFormik<LoginUserBody>({
    enableReinitialize: false,
    initialValues: defaultValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (!params.basePath) return;
      dispatch(signInUser({ userType: params.basePath, body: values }));
    },
  });

  // Successful authentication
  useEffect(() => {
    const handleSignInSuccessful = () => {
      if (isSignedIn) {
        dispatch(resetSignInUser());
        const user = getAuthUser();
        if (user) {
          if (user.isEmailVerified || user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          return navigate(`/user/verify-email`);
        }
      }
    };
    handleSignInSuccessful();
  }, [isSignedIn]);

  useEffect(() => {
    const handleSignupSuccessful = () => {
      if (googleAuthSuccess) {
        dispatch(resetContinueWithGoogle());
        const user = getAuthUser();
        if (user) {
          if (user.isEmailVerified || user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          return navigate(`/user/verify-email`);
        }
      }
    };

    handleSignupSuccessful();
  }, [googleAuthSuccess]);

  // Failed authentication
  useEffect(() => {
    if (signInErrorMessage) {
      toast.error(signInErrorMessage);
      if (signInErrors) {
        validation.setErrors(signInErrors);
      }
      const tmo = setTimeout(() => {
        dispatch(resetSignInUser());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [signInErrorMessage]);

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

  return (
    <React.Fragment>
      <div className="flex items-center">
        <img src={blacksightLogo} className="max-h-10 object-contain" />
      </div>

      {/* Form */}
      <div className="w-[90%] max-w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center font-caladea">
            Welcome Back
          </h1>
          <p className="text-center text-sm">
            Sign in to continue to Blacksight
          </p>
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
            groupLabel="Email"
            placeholder="Enter your email"
            size="lg"
            name="email"
            disabled={signingIn}
            validation={validation}
          />
          <FormGroup
            type="password"
            groupLabel="Password"
            placeholder="Enter your password"
            size="lg"
            name="password"
            disabled={signingIn}
            validation={validation}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <Checkbox size={"md"} id="remember-me" />
              <label
                className="text-sm text-gray-600 font-medium cursor-pointer"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <Link
              to={`/${params.basePath}/forgot-password`}
              className="text-sm text-blue-900 font-semibold"
            >
              Forgot Password
            </Link>
          </div>

          {(signInErrorMessage || googleAuthErrorMessage) && (
            <InfoBlock variant={"error"} className="mt-8">
              {signInErrorMessage || googleAuthErrorMessage}
            </InfoBlock>
          )}

          <Button
            className="w-full cursor-pointer mt-10"
            variant={"default"}
            size={"md"}
            disabled={signingIn || gettingOauthData || authenticatingWithGoogle}
          >
            {signingIn ? <Spinner type="form" /> : "Sign In"}
          </Button>

          {params.basePath === UserTypes.USER && (
            <Button
              className="w-full cursor-pointer mt-4 flex items-center gap-2"
              size={"md"}
              type="button"
              variant={"outline"}
              disabled={
                signingIn ||
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
        {params.basePath === UserTypes.USER && (
          <div className="flex items-baseline gap-1">
            <p className="text-sm text-gray-600 font-medium">
              Don't have an account?
            </p>
            <Link
              aria-disabled={authenticatingWithGoogle || signingIn}
              to={`/${params.basePath}/signup`}
              className="text-sm text-blue-900 font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
