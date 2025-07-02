import { Button } from "@/components/form";
import { UserData } from "@/interfaces";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { InfoData, InfoTitle, Row } from "../my-profile/shared";
import { ContactInfoForm } from "./forms";

const Header = ({ openForm }: { openForm: () => void }) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-lg text-gray-600">
        Contact Information
      </h4>
      <Button
        className="ml-auto text-gray-500 font-normal cursor-pointer gap-2"
        variant={"outline"}
        onClick={openForm}
      >
        Edit
        <PencilLine />
      </Button>
    </header>
  );
};

const Informations = ({ user }: { user: UserData | null }) => {
  const businessData = user?.businessInfo;

  return (
    <div className="flex flex-col gap-5">
      <Row>
        <div>
          <InfoTitle>Contact Name</InfoTitle>
          <InfoData>{businessData?.contactName ?? "-"}</InfoData>
        </div>
        <div>
          <InfoTitle>Contact Email</InfoTitle>
          <InfoData>{businessData?.contactEmail ?? "-"}</InfoData>
        </div>
      </Row>
      <Row>
        <div>
          <InfoTitle>Phone number</InfoTitle>
          <InfoData>{businessData?.contactTel ?? "-"}</InfoData>
        </div>
      </Row>
    </div>
  );
};

export const ContactInfo = ({ user }: { user: UserData | null }) => {
  const [contactInfoFormOpen, setContactInfoFormOpen] = useState(false);

  const openForm = () => setContactInfoFormOpen(true);
  return (
    <div className="p-6 border rounded-xl border-gray-200">
      <Header openForm={openForm} />
      <Informations user={user} />

      <ContactInfoForm
        isOpen={contactInfoFormOpen}
        onOpenChange={setContactInfoFormOpen}
      />
    </div>
  );
};
