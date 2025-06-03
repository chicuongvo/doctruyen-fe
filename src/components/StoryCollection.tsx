import { getAllStories, getGenres } from "@/api/stories.api";
import ItemCardV1 from "./ItemCard/ItemCardV1";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

export default function StoryCollection(props: {
  description: string;
  serverURL: string;
  clientURL: string;
  title: string;
  showFilter: boolean;
}) {
  const { showFilter, title } = props;
  const [genres, setGenres] = useState<[]>([]);
  const [params] = useSearchParams();
  const page = parseInt(params.get("page") ?? "1");
  const location = useLocation();
  const limit = parseInt(params.get("limit") ?? "10");
  const titleSearch = title || params.get("title") || "";
  const [loading, setIsLoading] = useState<boolean>(false);
  const genre = params.get("genre") || "";

  const [stories, setStories] = useState<any[]>(
    Array.from({ length: 10 }).fill(0)
  );
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const response = await getGenres();
        if (response.data.success) setGenres(response.data.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const response = await getAllStories({
          page: page,
          limit: limit,
          title: titleSearch,
          genres: genre,
        });
        if (response.data.success) {
          setStories(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, [page, titleSearch, genre]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="lg:flex font-spartan lg:min-h-screen">
      {showFilter && (
        <div className="filter mr-3 h-fit flex-none lg:w-[290px] w-full flex flex-col shadow-xl rounded-xl overflow-hidden">
          <input
            type="checkbox"
            id="filter-toggle"
            defaultChecked={true}
            className="hidden peer"
          />
          <label
            htmlFor="filter-toggle"
            className="peer-checked:[&>*>*:nth-child(2)]:rotate-180"
          >
            <div className="filter-header px-3 py-6 flex items-center justify-between transition-transform text-lg font-semibold  ">
              <p>Chọn thể loại</p>
              <div
                className="w-[15px] h-[15px] bg-white"
                style={{
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                }}
              ></div>
            </div>
          </label>
          <div className="filter-content flex flex-col peer-checked:hidden transition-all duration-1000 border-zinc-700 border rounded-xl overflow-hidden">
            {genres.length > 0 &&
              genres.map((value: any) => {
                return (
                  <Link
                    key={value.name}
                    to={`${location.pathname}?page=1&genre=${value.name}`}
                  >
                    <p
                      className={`p-4 w-full cursor-pointer border-1 border-l-0 bg-zinc-800 border-r-0 border-zinc-700 hover:bg-zinc-700`}
                    >
                      {value.name}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      <div className="shadow-xl p-6 flex flex-1 bg-zinc-800 rounded-xl flex-col">
        <div>
          <h1 className="font-bold text-2xl">
            {genre == "" ? "Tất cả thể loại" : genre}
          </h1>
        </div>
        <div className="collection mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          {stories.length > 0 &&
            stories.map((story: any, index: Number) => {
              return <ItemCardV1 key={story.id || index} story={story} />;
            })}
        </div>
        <div className="mt-auto">
          <Pagination currentPage={page} totalPages={100} />
        </div>
      </div>
    </div>
  );
}
