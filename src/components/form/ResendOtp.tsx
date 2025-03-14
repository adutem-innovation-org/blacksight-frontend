import { Spinner } from "../progress";
import { Button } from "./Button";

type Props = {
  seconds: number;
  minutes: number;
  resendOtp: () => void;
  disabled: boolean;
  loading?: boolean;
};

export const ResendOtp = ({
  seconds,
  minutes,
  resendOtp,
  disabled,
  loading = false,
}: Props) => {
  return (
    <div className="flex justify-between my-3 items-center">
      {seconds > 0 || minutes > 0 ? (
        <p className="text-sm text-gray-600 font-medium">
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p className="text-sm text-gray-600 font-medium">
          Didn't recieve code?
        </p>
      )}
      <Button
        type="button"
        disabled={seconds > 0 || minutes > 0 || disabled}
        onClick={resendOtp}
        variant={"link"}
        size={"link"}
      >
        {loading ? <Spinner type="primary" /> : "Resend OTP"}
      </Button>
    </div>
  );
};
