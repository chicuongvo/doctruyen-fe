const StoryReadingSkeleton = () => {
  return (
    <div className="bg-black p-8 text-white dark:bg-white dark:text-black">
      <div className="p-8 max-w-[800px] w-full m-auto max-md:p-4 overflow-hidden">
        <div className="skeleton h-8 w-1/3 mb-8 rounded" />
        <div className="space-y-4 text-xl mb-8">
          <div className="skeleton h-5 w-full rounded dark:bg-zinc-200" />
          <div className="skeleton h-5 w-5/6 rounded dark:bg-zinc-200" />
          <div className="skeleton h-5 w-3/4 rounded dark:bg-zinc-200" />
          <div className="skeleton h-5 w-2/3 rounded dark:bg-zinc-200" />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <div className="skeleton h-12 w-48 rounded-xl" />
        <div className="skeleton h-12 w-48 rounded-xl" />
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-12 dark:bg-zinc-100">
        <div className="skeleton h-6 w-48 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton h-10 rounded" />
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 mt-8 p-6 rounded-xl dark:bg-zinc-100">
        <div className="skeleton h-8 w-64 rounded mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[116px] md:w-[186px]">
              <div className="skeleton w-[116px] md:w-[186px] h-[160px] md:h-[260px] rounded-lg" />
              <div className="mt-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryReadingSkeleton;
