import { Button } from "@/components/form";
import { PencilLine } from "lucide-react";
import { InfoData, InfoTitle, Row } from "./shared";
import { useState } from "react";
import { UserData } from "@/interfaces";
import { AddressInfoForm } from "./forms";

const Header = ({ openForm }: { openForm: () => void }) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-lg text-gray-600">Address</h4>
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
          <InfoTitle>Country</InfoTitle>
          {/* United Kingdom */}
          <InfoData>{user?.addressInfo?.country || "-"}</InfoData>
        </div>
        <div>
          <InfoTitle>City</InfoTitle>
          {/* Leeds */}
          <InfoData>{user?.addressInfo?.city || "-"}</InfoData>
        </div>
      </Row>
      <Row>
        <div>
          <InfoTitle>State</InfoTitle>
          {/* East London */}
          <InfoData>{user?.addressInfo?.state || "-"}</InfoData>
        </div>
        <div>
          <InfoTitle>Postal/Zip Code</InfoTitle>
          {/* ERT 2354 */}
          <InfoData>{user?.addressInfo?.zipCode || "-"}</InfoData>
        </div>
      </Row>
    </div>
  );
};

export const AddressInfo = ({ user }: { user: UserData | null }) => {
  const [addressInfoFormOpen, setAddressInfoFormOpen] = useState(false);

  const openForm = () => setAddressInfoFormOpen(true);

  return (
    <div className="p-6 border rounded-xl border-gray-200">
      <Header openForm={openForm} />
      <Informations user={user} />

      <AddressInfoForm
        isOpen={addressInfoFormOpen}
        onOpenChange={setAddressInfoFormOpen}
      />
    </div>
  );
};
