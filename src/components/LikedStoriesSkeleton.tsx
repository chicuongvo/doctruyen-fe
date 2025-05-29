const LikedStoriesSkeleton = () => {
  return (
    <div className="bg-black p-8 text-white">
      <div className="skeleton h-8 w-48 mb-8"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="skeleton aspect-[2/3] w-full mb-2"></div>
            <div className="skeleton h-4 w-3/4 mb-2"></div>
            <div className="skeleton h-3 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedStoriesSkeleton;
