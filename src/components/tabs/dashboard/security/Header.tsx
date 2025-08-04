export const SecurityTabHeader = () => {
  return (
    // <header className="w-full bg-gray-100 border-b pb-8">
    <header className="w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-primary">
          Password and Security
        </h1>
        <p className="text-sm text-gray-600">
          Manage password and two-factor authentication settings for your
          Blacksight account.
        </p>
      </div>
    </header>
  );
};
