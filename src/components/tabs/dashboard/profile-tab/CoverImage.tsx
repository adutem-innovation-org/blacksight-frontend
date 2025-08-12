import coverImage from "@/assets/images/cover-image-3.jpg";

export const CoverImage = () => {
  return (
    <div className="w-full h-0 relative -mt-3">
      <div
        className="w-full h-120 sm:h-100 md:h-90 overflow-hidden absolute top-0 left-0 right-0
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#364574] before:to-[#405189]
        before:opacity-90
      "
      >
        <img src={coverImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
