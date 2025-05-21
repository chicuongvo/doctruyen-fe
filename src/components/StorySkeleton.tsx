const StorySkeleton = () => {
  return (
    <div className="bg-black p-4 md:p-8 text-white">
      <div className="flex flex-col md:flex-row p-4 md:p-8 rounded-xl dark:border-zinc-700 dark:bg-zinc-800 gap-6 md:gap-8 mt-4">
        <div className="md:max-w-md mx-auto md:mx-0 flex-shrink-0 w-[270px]">
          <div className="skeleton w-[270px] h-[360px] rounded-lg" />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="skeleton h-8 w-2/3 rounded" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-1/3 rounded" />
              <div className="skeleton h-4 w-1/4 rounded" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="skeleton w-20 h-8 rounded" />
              <div className="skeleton w-24 h-8 rounded" />
              <div className="skeleton w-16 h-8 rounded" />
            </div>
            <div className="space-y-2 mt-4">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="skeleton flex-1 h-12 rounded" />
            <div className="skeleton flex-1 h-12 rounded" />
            <div className="skeleton flex-1 h-12 rounded" />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-10">
        <div className="skeleton h-6 w-48 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-12 rounded" />
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-10">
        <div className="skeleton h-6 w-32 rounded mb-4" />

        <div className="flex flex-col space-y-3 max-h-[300px] overflow-y-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded" />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="skeleton h-5 w-64 rounded" />
          <div className="skeleton w-full h-32 rounded" />
          <div className="skeleton h-12 w-32 rounded" />
        </div>
      </div>
    </div>
  );
};

export default StorySkeleton;
