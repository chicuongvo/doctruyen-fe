import { getAllStories, getGenres } from "@/api/stories.api";
import ItemCardV1 from "./ItemCard/ItemCardV1";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function PaginationBlock(page: number) {
  let url = location.pathname;
  let content: any = [];
  if (page > 1)
    content.push(
      PaginationButton({ link: `${url}?page=${page - 1}`, content: "<" })
    );

  if (page > 3) {
    content.push(PaginationButton({ link: `${url}?page=1`, content: "1" }));
    content.push(
      PaginationButton({
        link: `${url}?page=${page + 1}`,
        content: "...",
      })
    );
    content.push(
      PaginationButton({
        link: `${url}?page=${page - 1}`,
        content: String(page - 1),
      })
    );
  }
  content.push(
    PaginationButton({
      link: `${url}?page=${page}`,
      content: String(page),
    })
  );
  content.push(
    PaginationButton({
      link: `${url}?page=${page + 1}`,
      content: String(page + 1),
    })
  );
  // content.push(
  //   PaginationButton({
  //     link: `${url}&page=${page + 1}`,
  //     content: "...",
  //   })
  // );
  if (page < 99) {
    content.push(
      PaginationButton({ link: `${url}&page=${99}`, content: "99" })
    );
    content.push(
      PaginationButton({ link: `${url}&page=${page + 1}`, content: ">" })
    );
  }
  return (
    <div className="pagination flex gap-3 items-center justify-center mt-3">
      {content}
    </div>
  );
}
function PaginationButton({
  link,
  content,
}: {
  link: string;
  content: string;
}) {
  return (
    <Link to={link}>
      <div className="w-[40px] h-[40px] rounded-full bg-pink-50 flex items-center justify-center">
        {content}
      </div>
    </Link>
  );
}

export default function StoryCollection(props: {
  description: string;
  serverURL: string;
  clientURL: string;
  title: string;
  showFilter: boolean;
}) {
  const { showFilter } = props;
  const [genres, setGenres] = useState<[]>([]);
  const params = useSearchParams();
  const page = parseInt(params[0].get("page") ?? "1");
  const location = useLocation();
  const limit = parseInt(params[0].get("limit") ?? "10");
  const titleSearch = params[0].get("title") || "";
  const [stories, setStories] = useState<[]>([]);
  const [genre, setGenre] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setGenres(response.data.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getAllStories({
          page: page,
          limit: limit,
          title: titleSearch,
          genres: genre,
        });
        setStories(response.data.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, [page, titleSearch, genre]);
  return (
    <div className="lg:flex font-spartan lg:min-h-screen">
      {showFilter && (
        <div className="filter mr-3 h-fit flex-none lg:w-[290px] w-full flex flex-col shadow-xl rounded-xl overflow-hidden">
          <input type="checkbox" id="filter-toggle" className="hidden peer" />
          <label
            htmlFor="filter-toggle"
            className="peer-checked:[&>*>*:nth-child(2)]:rotate-180"
          >
            <div className="filter-header px-3 py-6 flex items-center justify-between transition-transform">
              <p>Chọn thể loại</p>
              <div
                className="w-[15px] h-[15px] bg-black"
                style={{
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                }}
              ></div>
            </div>
          </label>
          <div className="filter-content flex flex-col peer-checked:hidden transition-all duration-1000">
            {genres.length > 0 &&
              genres.map((value: any) => {
                return (
                  <Link to={`${location.pathname}?page=1`}>
                    <p
                      className="p-4 w-full cursor-pointer"
                      onClick={() => {
                        setGenre(value.name);
                      }}
                    >
                      {value.name}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      <div className="shadow-xl p-6 flex-1">
        <div>
          <h1 className="font-bold text-2xl">
            {genre ? genre : "Tất cả thể loại"}
          </h1>
          {/* <p className="text-sm mt-3">{description}</p> */}
        </div>
        <div className="collection mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          {stories.length > 0 &&
            stories.map((story: any) => {
              return <ItemCardV1 key={story.id} story={story} />;
            })}
        </div>
        {PaginationBlock(page)}
      </div>
    </div>
  );
}
