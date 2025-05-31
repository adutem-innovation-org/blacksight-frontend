import { UserData } from "@/interfaces";
import { PencilLine } from "lucide-react";
import { InfoData, InfoTitle, Row } from "./shared";
import { Button } from "@/components/form";
import { useState } from "react";
import { PersonalInfoForm } from "./forms";

const Header = ({ openForm }: { openForm: () => void }) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-lg text-gray-600">
        Personal Information
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
  return (
    <div className="flex flex-col gap-5">
      <Row>
        <div>
          <InfoTitle>First Name</InfoTitle>
          <InfoData>{user?.firstName}</InfoData>
        </div>
        <div>
          <InfoTitle>Last Name</InfoTitle>
          <InfoData>{user?.lastName}</InfoData>
        </div>
      </Row>
      <Row>
        <div>
          <InfoTitle>Email address</InfoTitle>
          <InfoData>{user?.email}</InfoData>
        </div>
        <div>
          <InfoTitle>Phone</InfoTitle>
          <InfoData>{user?.phone || "-"}</InfoData>
        </div>
      </Row>
    </div>
  );
};

export const PersonalInfo = ({ user }: { user: UserData | null }) => {
  const [personalInfoFormOpen, setPersonalInfoFormOpen] = useState(false);

  const openForm = () => setPersonalInfoFormOpen(true);

  return (
    <div className="p-6 border rounded-xl border-gray-200">
      <Header openForm={openForm} />
      <Informations user={user} />

      <PersonalInfoForm
        isOpen={personalInfoFormOpen}
        onOpenChange={setPersonalInfoFormOpen}
      />
    </div>
  );
};
