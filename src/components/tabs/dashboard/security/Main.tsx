import { ChangePasswordSection } from "./ChangePassword";
import { MFASection } from "./MFASection";

export const SecurityTabMainContent = () => {
  return (
    <div className="mt-10">
      <ChangePasswordSection />
      <MFASection />
    </div>
  );
};
