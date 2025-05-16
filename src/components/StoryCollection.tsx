import { getAllStories } from "@/api/stories.api";
import ItemCardV1 from "./ItemCard/ItemCardV1";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const genres = [
  {
    name: "All Novels",
    "all-novels": "All Novels",
  },
  { romance: "Romance", name: "Romance" },
  { werewolf: "Werewolf", name: "Werewolf" },
  { fantasty: "Fantasty", name: "Fantasty" },
  { urban: "Urban", name: "Urban" },
  { steamy: "Steamy", name: "Steamy" },
  { "young-adult": "Young Adult", name: "Young Adult" },
  { thriller: "Thriller", name: "Thriller" },
];
function PaginationBlock(page: number, url: string) {
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
  content.push(
    PaginationButton({
      link: `${url}?page=${page + 1}`,
      content: "...",
    })
  );
  content.push(PaginationButton({ link: `${url}?page=${99}`, content: "99" }));
  content.push(
    PaginationButton({ link: `${url}?page=${page + 1}`, content: ">" })
  );

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
  const { title, description, showFilter } = props;

  // const { page } = useSearchParams();
  const params = useSearchParams();
  const page = parseInt(params[0].get("page") ?? "1");
  const location = useLocation();
  console.log(location);
  const limit = parseInt(params[0].get("limit") ?? "10");
  const titleSearch = params[0].get("title") || "";

  const [stories, setStories] = useState<[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await getAllStories({
        page,
        title: titleSearch,
        limit,
      });
      setStories(response.data.data);
      console.log(response.data.data);
    };
    fetchStories();
  }, [page, titleSearch]);
  return (
    <div className="lg:flex font-spartan">
      {showFilter && (
        <div className="filter mr-3 h-fit flex-none lg:w-[290px] w-full flex flex-col shadow-xl rounded-xl overflow-hidden">
          <input type="checkbox" id="filter-toggle" className="hidden peer" />
          <label
            htmlFor="filter-toggle"
            className="peer-checked:[&>*>*:nth-child(2)]:rotate-180"
          >
            <div className="filter-header px-3 py-6 flex items-center justify-between transition-transform">
              <p>Select Genre</p>
              <div
                className="w-[15px] h-[15px] bg-black"
                style={{
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                }}
              ></div>
            </div>
          </label>
          <div className="filter-content flex flex-col peer-checked:hidden transition-all duration-1000">
            {genres.map((value) => {
              return (
                <a className="px-3 py-6 shadow" id={value.name}>
                  {value.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div className="shadow-xl p-6">
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-sm mt-3">{description}</p>
        </div>
        <div className="collection mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          {stories.length > 0 &&
            stories.map((story: any) => {
              return <ItemCardV1 key={story.id} story={story} />;
            })}
        </div>
        {PaginationBlock(page, location.pathname)}
      </div>
    </div>
  );
}
