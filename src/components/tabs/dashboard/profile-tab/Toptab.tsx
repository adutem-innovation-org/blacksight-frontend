import { Button } from "@/components/form";
import { DropdownComp } from "@/components/popups";
import { ProfileTabsEnum } from "@/enums";
import { cn } from "@/lib/utils";
import {
  Building2,
  Contact,
  MapPinHouse,
  SquarePen,
  UserRoundCog,
} from "lucide-react";
import { useState } from "react";
import {
  AddressInfoForm,
  BasicInfoForm,
  ContactInfoForm,
  PersonalInfoForm,
} from "./forms";
import { resetDocumentElement } from "@/helpers";

export const ProfileTopTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: ProfileTabsEnum;
  setActiveTab: (tab: ProfileTabsEnum) => void;
}) => {
  const [personalInfoFormOpen, setPersonalInfoFormOpen] = useState(false);
  const [addressInfoFormOpen, setAddressInfoFormOpen] = useState(false);
  const [basicInfoFormOpen, setBasicInfoFormOpen] = useState(false);
  const [contactInfoFormOpen, setContactInfoFormOpen] = useState(false);

  const openPersonalInfoForm = () => setPersonalInfoFormOpen(true);
  const openAddressInfoForm = () => setAddressInfoFormOpen(true);
  const openBasicInfoForm = () => setBasicInfoFormOpen(true);
  const openContactInfoForm = () => setContactInfoFormOpen(true);

  const handleCloseForm = (val: boolean) => {
    setPersonalInfoFormOpen(false);
    setAddressInfoFormOpen(false);
    setBasicInfoFormOpen(false);
    setContactInfoFormOpen(false);
    resetDocumentElement();
  };

  return (
    <div className="w-full mb-6 mt-12">
      <div className="w-full flex justify-between items-center">
        <div>
          <Button
            className={cn(
              "bg-transparent rounded-md h-10 !text-sm !font-dmsans tracking-tight font-medium hover:bg-gray-300/10 px-6 duration-300",
              {
                "bg-gray-300/10": activeTab === ProfileTabsEnum.OVERVIEW,
              }
            )}
          >
            Overview
          </Button>
        </div>

        <DropdownComp
          Trigger={() => (
            <Button
              className="
        rounded-md h-10 !text-sm !font-dmsans tracking-tight font-medium
        "
              variant={"brand"}
            >
              <SquarePen />
              Edit Profile
            </Button>
          )}
          data={[
            {
              placeholder: "Personal Info",
              onClick: () => {
                openPersonalInfoForm();
              },
              Icon: UserRoundCog,
            },
            {
              placeholder: "Address",
              onClick: () => {
                openAddressInfoForm();
              },
              Icon: MapPinHouse,
            },
            {
              placeholder: "Business Info",
              onClick: () => {
                openBasicInfoForm();
              },
              Icon: Building2,
            },
            {
              placeholder: "Contact Info",
              onClick: () => {
                openContactInfoForm();
              },
              Icon: Contact,
            },
          ]}
        />
      </div>

      <PersonalInfoForm
        isOpen={personalInfoFormOpen}
        onOpenChange={handleCloseForm}
      />

      <AddressInfoForm
        isOpen={addressInfoFormOpen}
        onOpenChange={handleCloseForm}
      />

      <BasicInfoForm
        isOpen={basicInfoFormOpen}
        onOpenChange={handleCloseForm}
      />

      <ContactInfoForm
        isOpen={contactInfoFormOpen}
        onOpenChange={handleCloseForm}
      />
    </div>
  );
};
