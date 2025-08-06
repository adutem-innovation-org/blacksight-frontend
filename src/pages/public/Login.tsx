import { Button, Checkbox, FormGroup, InfoBlock, Spinner } from "@/components";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import googleIcon from "@/assets/images/google.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { availableMFAMethods, emailRegex, passwordRegex } from "@/constants";
import { LoginUserBody } from "@/interfaces";
import { useGoogleAuth, useStore } from "@/hooks";
import { resetContinueWithGoogle, resetSignInUser, signInUser } from "@/store";
import { UserTypes } from "@/enums";
import toast from "react-hot-toast";
import {
  clearSession,
  clearTempSession,
  getAuthUser,
  getTempData,
} from "@/helpers";
import blacksightLogo from "@/assets/images/blacksight_logo_side.png";
import appleIcon from "@/assets/images/logos_apple.png";

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
          if (user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          if (!user.isEmailVerified) return navigate("/user/verify-email");
          if (!user.isOnboarded && !user.skippedOnboarding)
            return navigate(`/onboard`);
          return navigate("/dashboard", { replace: true });
        }

        const tempData = getTempData();

        if (tempData) {
          return navigate(`/user/2fa`, {
            state: {
              mfaMethods: tempData.mfaMethods,
              requiresMFA: tempData.requiresMFA,
            },
          });
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
          if (user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          if (!user.isEmailVerified) return navigate("/user/verify-email");
          if (!user.isOnboarded && !user.skippedOnboarding)
            return navigate(`/onboard`);
          return navigate("/dashboard", { replace: true });
        }

        const tempData = getTempData();

        if (tempData) {
          return navigate(`/user/2fa`, {
            state: {
              mfaMethods: tempData.mfaMethods,
              requiresMFA: tempData.requiresMFA,
            },
          });
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

  useEffect(() => {
    clearSession();
    clearTempSession();
  }, []);

  // return (
  //   <React.Fragment>
  //     <div className="flex items-center">
  //       <img src={blacksightLogo} className="max-h-10 object-contain" />
  //     </div>

  //     {/* Form */}
  //     <div className="w-[90%] max-w-[450px]">
  //       <div className="flex flex-col gap-2">
  //         <h1 className="text-4xl font-bold text-center font-caladea">
  //           Welcome Back
  //         </h1>
  //         <p className="text-center text-sm">
  //           Sign in to continue to Blacksight
  //         </p>
  //       </div>
  //       <form
  //         className="pt-8 w-full"
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           validation.handleSubmit();
  //           return false;
  //         }}
  //       >
  //         <FormGroup
  //           type="text"
  //           groupLabel="Email"
  //           placeholder="Enter your email"
  //           size="lg"
  //           name="email"
  //           disabled={signingIn}
  //           validation={validation}
  //         />
  //         <FormGroup
  //           type="password"
  //           groupLabel="Password"
  //           placeholder="Enter your password"
  //           size="lg"
  //           name="password"
  //           disabled={signingIn}
  //           validation={validation}
  //         />
  //         <div className="flex justify-between items-center mt-3">
  //           <div className="flex items-center gap-1.5 cursor-pointer">
  //             <Checkbox size={"md"} id="remember-me" />
  //             <label
  //               className="text-sm text-gray-600 font-medium cursor-pointer"
  //               htmlFor="remember-me"
  //             >
  //               Remember me
  //             </label>
  //           </div>
  //           <Link
  //             to={`/${params.basePath}/forgot-password`}
  //             className="text-sm text-blue-900 font-semibold"
  //           >
  //             Forgot Password
  //           </Link>
  //         </div>

  //         {(signInErrorMessage || googleAuthErrorMessage) && (
  //           <InfoBlock variant={"error"} className="mt-8">
  //             {signInErrorMessage || googleAuthErrorMessage}
  //           </InfoBlock>
  //         )}

  //         <Button
  //           className="w-full cursor-pointer mt-10"
  //           variant={"default"}
  //           size={"md"}
  //           disabled={signingIn || gettingOauthData || authenticatingWithGoogle}
  //         >
  //           {signingIn ? <Spinner type="form" /> : "Sign In"}
  //         </Button>

  //         {params.basePath === UserTypes.USER && (
  //           <Button
  //             className="w-full cursor-pointer mt-4 flex items-center gap-2"
  //             size={"md"}
  //             type="button"
  //             variant={"outline"}
  //             disabled={
  //               signingIn ||
  //               gettingOauthData ||
  //               !gapiReady ||
  //               authenticatingWithGoogle
  //             }
  //             onClick={() => googleLogin()}
  //           >
  //             <img src={googleIcon} className="w-6 h-6" />
  //             {authenticatingWithGoogle ? (
  //               <Spinner type="form" />
  //             ) : (
  //               "Sign In with Google"
  //             )}
  //           </Button>
  //         )}
  //       </form>
  //     </div>

  //     {/* Footer */}
  //     <div>
  //       {params.basePath === UserTypes.USER && (
  //         <div className="flex items-baseline gap-1">
  //           <p className="text-sm text-gray-600 font-medium">
  //             Don't have an account?
  //           </p>
  //           <Link
  //             aria-disabled={authenticatingWithGoogle || signingIn}
  //             to={`/${params.basePath}/signup`}
  //             className="text-sm text-blue-900 font-semibold"
  //           >
  //             Sign Up
  //           </Link>
  //         </div>
  //       )}
  //     </div>
  //   </React.Fragment>
  // );

  return (
    <React.Fragment>
      {/* Logo */}

      <div className="flex justify-center flex-col gap-4">
        <div className="flex justify-center ">
          <img src={blacksightLogo} className="max-h-10 object-contain" />
        </div>

        {/* Container */}
        <div className="w-[90%] max-w-[450px] flex flex-col items-center">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl text-center text-blue-500">
            Enter your Login Details
          </h1>

          {/* Form */}
          <form
            className="w-full space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <FormGroup
              type="text"
              groupLabel="Email"
              placeholder="Enter your Email Address"
              size="lg"
              name="email"
              disabled={signingIn}
              validation={validation}
            />

            <FormGroup
              type="password"
              groupLabel="Password"
              placeholder="Enter your Password"
              size="lg"
              name="password"
              disabled={signingIn}
              validation={validation}
            />

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox size="md" id="remember-me" />
                <label
                  className="text-sm text-gray-600 font-medium cursor-pointer"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
            </div>

            {/* Error Block */}
            {(signInErrorMessage || googleAuthErrorMessage) && (
              <InfoBlock variant="error" className="mt-4">
                {signInErrorMessage || googleAuthErrorMessage}
              </InfoBlock>
            )}

            {/* Sign In Button */}
            <Button
              className="w-full mt-6 py-3 text-lg font-medium rounded-lg"
              variant="default"
              size="md"
              disabled={
                signingIn || gettingOauthData || authenticatingWithGoogle
              }
            >
              {signingIn ? <Spinner type="form" /> : "Login"}
            </Button>

            {/* Divider Text */}
              {params.basePath === UserTypes.USER && (

            <p className="text-xs text-gray-500 text-center mt-2">Or Sign in</p>
              )}

            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
              {/* Google Sign In */}
              {params.basePath === UserTypes.USER && (
                <Button
                  className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-3"
                  size="md"
                  type="button"
                  variant="outline"
                  disabled={
                    signingIn ||
                    gettingOauthData ||
                    !gapiReady ||
                    authenticatingWithGoogle
                  }
                  onClick={() => googleLogin()}
                >
                  <img src={googleIcon} className="w-5 h-5" />
                  {authenticatingWithGoogle ? (
                    <Spinner type="form" />
                  ) : (
                    "Sign in Using Google"
                  )}
                </Button>
              )}


              {/* Apple Sign In */}
              {params.basePath === UserTypes.USER && (

                <Button
                  className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-3"
                  size="md"
                  type="button"
                  variant="outline"
                >
                  <img src={appleIcon} className="w-5 h-5" />
                  Sign in Using Apple
                </Button>
              )}
            </div>
          </form>
        </div>
        {/* Footer Links */}
        {params.basePath === UserTypes.USER && (

          <div className="flex justify-between w-full mt-6 text-sm">
            <p className="text-gray-600">
              Forgotten Password?{" "}
              <Link to={`/${params.basePath}/forgot-password`} className="text-blue-500 font-medium">
                Click Here.
              </Link>
            </p>
            <Link to={`/${params.basePath}/signup`} className="text-blue-500 font-medium">
              Sign Up
            </Link>
          </div>

        )}
      </div>
    </React.Fragment>
  );
};
