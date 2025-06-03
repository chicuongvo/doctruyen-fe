import { useEffect, useState, useRef } from "react";
import StoryCollection from "../components/StoryCollection";
import { getGenres } from "@/api/stories.api";
import { Link } from "react-router-dom";

function Search() {
  const [genres, setGenres] = useState<string[]>([]);
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // window.scrollTo(0, 0);
    const fetchGenres = async () => {
      const response = await getGenres();
      if (response.data.success) setGenres(response.data.data);
    };
    fetchGenres();
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentSearchValue(searchValue);
    }, 1000);
  };
  return (
    <div className="bg-black">
      <div className="search-page py-8 px-[1rem] max-w-screen-xl mx-auto">
        <div className="search-block flex flex-col shadow-xl p-10 bg-zinc-700 rounded-xl text-white">
          <div className="mb-2 relative">
            <span className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5 bg-no-repeat bg-contain"></span>
            <input
              className="w-full border-1 py-2 rounded-xl px-5 text-lg"
              placeholder="Nhập tên truyện bạn muốn tìm kiếm..."
              onChange={handleSearchChange}
              type="text"
            />
          </div>
          <div className="top-tags-block">
            <h2 className="mb-2 text-xl font-semibold">Top Tags</h2>
            <div className="flex flex-wrap gap-4 ">
              {genres.map((genre: any) => {
                return (
                  <Link
                    to={`/stories?genre=${genre.name}&page=1`}
                    key={genre.genre_id}
                    className="py-2 px-3 rounded-xl text-sm font-light bg-zinc-500"
                  >
                    {genre.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="top-movies mt-10 text-white">
          <StoryCollection
            title={`${currentSearchValue}`}
            serverURL=""
            clientURL=""
            showFilter={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
