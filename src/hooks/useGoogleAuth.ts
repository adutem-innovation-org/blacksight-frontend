import { useState, useCallback } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useStore } from "@/hooks";
import { continueWithGoogle } from "@/store";
import { getOAuthReqBody } from "@/helpers";
import toast from "react-hot-toast";

export const useGoogleAuth = () => {
  const { dispatch } = useStore();
  const [gettingOauthData, setGettingOauthData] = useState(false);

  const handleOAuthSuccess = useCallback(
    async (
      tokenResponse: Omit<
        TokenResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => {
      try {
        setGettingOauthData(true);
        const data = await getOAuthReqBody(tokenResponse.access_token);
        dispatch(
          continueWithGoogle({
            ...data,
            lastName: data.lastName || data.firstName,
          })
        );
      } catch (error: unknown) {
        toast.error((error as any)?.message || "An unknown error occurred");
      } finally {
        setGettingOauthData(false);
      }
    },
    [dispatch]
  );

  const handleOAuthError = useCallback(
    (
      errorResponse: Pick<
        TokenResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => {
      console.error("Google OAuth Error:", errorResponse);
      toast.error("Google Sign-In failed");
    },
    []
  );

  const googleLogin = useGoogleLogin({
    onSuccess: handleOAuthSuccess,
    onError: handleOAuthError,
    scope: "email profile",
  });

  return { googleLogin, gettingOauthData };
};
