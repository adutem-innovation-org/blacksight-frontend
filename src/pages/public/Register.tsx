import { Button, FormGroup, InfoBlock, Spinner } from "@/components";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import googleIcon from "@/assets/images/google.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useStore } from "@/hooks";
import { emailRegex, passwordRegex } from "@/constants";
import { RegisterUserBody } from "@/interfaces";
import { resetSignUpUser, signUpUser } from "@/store";
import { UserTypes } from "@/enums";
import { getAuthUser } from "@/helpers";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const params = useParams() as { basePath: UserTypes };

  const { dispatch, getState } = useStore();

  const { isSignedUp, signUpErrors, signUpErrorMessage, signingUp } =
    getState("Auth");

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

  useEffect(() => {
    const handleSignupSuccessful = () => {
      if (isSignedUp) {
        dispatch(resetSignUpUser());
        const user = getAuthUser();
        if (user) {
          if (user.isEmailVerified || user.userType === UserTypes.ADMIN)
            return navigate("/dashboard", { replace: true });
          return navigate(`/user/verify-email`);
        }
      }
    };

    handleSignupSuccessful();
  }, [isSignedUp]);

  useEffect(() => {
    if (signUpErrorMessage) {
      toast.error(signUpErrorMessage);
      if (signUpErrors) {
        validation.setErrors(signUpErrors);
      }
      let tmo = setTimeout(() => {
        dispatch(resetSignUpUser());
        clearTimeout(tmo);
      }, 1400);
    }
  }, [signUpErrorMessage]);

  const { handleChange, handleBlur, values } = validation;

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
            disabled={signingUp}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            validation={validation}
          />
          <FormGroup
            type="text"
            groupLabel="Last name"
            placeholder="Enter your last name"
            size="lg"
            name="lastName"
            disabled={signingUp}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            validation={validation}
          />
          <FormGroup
            type="text"
            groupLabel="Email"
            placeholder="Enter your email"
            size="lg"
            name="email"
            disabled={signingUp}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            validation={validation}
          />
          <FormGroup
            type="password"
            groupLabel="Password"
            placeholder="Enter your password"
            size="lg"
            name="password"
            disabled={signingUp}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            validation={validation}
          />
          <FormGroup
            type="password"
            groupLabel="Confirm Password"
            placeholder="Confirm password"
            size="lg"
            name="confirmPassword"
            disabled={signingUp}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirmPassword}
            validation={validation}
          />

          {signUpErrorMessage && (
            <InfoBlock variant={"error"} className="mt-8">
              {signUpErrorMessage}
            </InfoBlock>
          )}

          <Button
            className="w-full cursor-pointer mt-10"
            variant={"default"}
            size={"md"}
            disabled={signingUp}
          >
            {signingUp ? <Spinner type="form" /> : "Sign Up"}
          </Button>
          {params.basePath === UserTypes.USER && (
            <Button
              className="w-full cursor-pointer mt-4 flex items-center gap-2"
              size={"md"}
              variant={"outline"}
              type="button"
            >
              <img src={googleIcon} className="w-6 h-6" />
              Sign In with Google
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
