import { UserRole } from "@/enums";
import { cn } from "@/lib/utils";

export const RoleCard = ({
  role,
  imageUrl,
  userRole,
  selectRole,
}: {
  role: UserRole;
  imageUrl: string;
  userRole: UserRole;
  selectRole: (role: UserRole) => void;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl p-8 bg-brand-20 flex flex-col justify-center items-center hover:bg-white hover:drop-shadow-md cursor-pointer duration-300",
        {
          "border-brand border-2 bg-white shadow-2xl shadow-brand-10 hover:bg-white hover:drop-shadow-none":
            role === userRole,
        }
      )}
      onClick={() => selectRole(role)}
    >
      <div className="w-30 h-30 overflow-hidden flex justify-center items-center">
        <img src={imageUrl} className="w-20 h-20 object-contain" />
      </div>
      <p>{role}</p>
    </div>
  );
};
