import { Button } from "@/components/form";
import { TopUsersTable } from "@/components/tables";

export const TopUsersWidget = () => {
  return (
    <div className="rounded-sm bg-white col-span-1 lg:col-span-2 flex flex-col">
      <div className="border-b p-4 px-6 flex justify-between items-center">
        <h3 className="font-sfpro-medium text-xl">Top Users</h3>
        <Button
          size={"sm"}
          className="rounded-sm bg-brand hover:bg-primary transition-colors duration-500 cursor-pointer h-8"
        >
          View all
        </Button>
      </div>
      <div className="flex-1 overflow-hidden max-w-full">
        <TopUsersTable />
      </div>
    </div>
  );
};
