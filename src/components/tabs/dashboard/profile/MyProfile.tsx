import { useProfile } from "@/hooks";
import { UserData } from "@/interfaces";
import man from "@/assets/images/man.png";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/form";
import styled from "styled-components";
import { cn } from "@/lib/utils";

const HeroSection = ({ user }: { user: UserData | null }) => {
  return (
    <div className="p-6 border rounded-xl border-gray-200 flex items-center gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-brand">
        <img
          src={user?.imageUrl || man}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="font-dmsans">
        <p className="text-lg font-medium">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-gray-500 font-inter">Owner</p>
        <p>-</p>
      </div>

      <Button
        className="ml-auto text-gray-500 font-normal cursor-pointer gap-2"
        variant={"outline"}
      >
        Edit
        <PencilLine />
      </Button>
    </div>
  );
};

const PersonalInfo = ({ user }: { user: UserData | null }) => {
  return (
    <div className="p-6 border rounded-xl border-gray-200">
      <header className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg text-gray-600">
          Personal Information
        </h4>
        <Button
          className="ml-auto text-gray-500 font-normal cursor-pointer gap-2"
          variant={"outline"}
        >
          Edit
          <PencilLine />
        </Button>
      </header>

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
            <InfoData>-</InfoData>
          </div>
        </Row>
      </div>
    </div>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 350px) 1fr;
  gap: 4rem;
`;

const InfoTitle = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p {...props} className={cn("font-dmsans text-gray-500", className)} />
  );
};

const InfoData = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      {...props}
      className={cn("font-medium font-dmsans text-gray-700", className)}
    />
  );
};

const Address = () => {
  return (
    <div className="p-6 border rounded-xl border-gray-200">
      <header className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg text-gray-600">Address</h4>
        <Button
          className="ml-auto text-gray-500 font-normal cursor-pointer gap-2"
          variant={"outline"}
        >
          Edit
          <PencilLine />
        </Button>
      </header>

      <div className="flex flex-col gap-5">
        <Row>
          <div>
            <InfoTitle>Country</InfoTitle>
            <InfoData>United Kingdom</InfoData>
          </div>
          <div>
            <InfoTitle>City</InfoTitle>
            <InfoData>Leeds</InfoData>
          </div>
        </Row>
        <Row>
          <div>
            <InfoTitle>State</InfoTitle>
            <InfoData>East London</InfoData>
          </div>
          <div>
            <InfoTitle>Postal Code</InfoTitle>
            <InfoData>ERT 2354</InfoData>
          </div>
        </Row>
      </div>
    </div>
  );
};

export const MyProfile = () => {
  const { user } = useProfile();

  return (
    <div className="px-8 py-4">
      <h4 className="font-semibold text-xl text-gray-700 mb-8">My Profile</h4>
      <div className="flex flex-col gap-6">
        <HeroSection user={user} />
        <PersonalInfo user={user} />
        <Address />
      </div>
    </div>
  );
};
