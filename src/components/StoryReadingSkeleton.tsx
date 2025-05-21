const StoryReadingSkeleton = () => {
  return (
    <div className="bg-black p-8 text-white">
      <div className="p-8 max-w-[800px] w-full m-auto max-md:p-4 overflow-hidden">
        <div className="skeleton h-8 w-1/3 mb-8 rounded" />
        <div className="space-y-4 text-xl mb-8">
          <div className="skeleton h-5 w-full rounded" />
          <div className="skeleton h-5 w-5/6 rounded" />
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-5 w-2/3 rounded" />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <div className="skeleton h-12 w-48 rounded-xl" />
        <div className="skeleton h-12 w-48 rounded-xl" />
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-12">
        <div className="skeleton h-6 w-48 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton h-10 rounded" />
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 mt-12 p-8 rounded-xl">
        <div className="skeleton h-6 w-48 mb-4 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-transparent p-4 rounded-lg shadow space-y-2"
            >
              <div className="skeleton h-32 w-full rounded-lg" />
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryReadingSkeleton;
