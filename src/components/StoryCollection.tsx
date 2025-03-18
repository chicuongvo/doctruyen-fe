import React from "react";
import ItemCardV1 from "./ItemCard/ItemCardV1";
import { useState } from "react";

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
function PaginationBlock(page: number) {
  let content: any = [];
  if (page > 1) content.push(PaginationButton({ link: "/", content: "<" }));

  if (page > 3) {
    content.push(PaginationButton({ link: "/", content: "1" }));
    content.push(PaginationButton({ link: "/", content: "..." }));
    content.push(PaginationButton({ link: "/", content: String(page - 1) }));
  }
  content.push(PaginationButton({ link: "/", content: String(page) }));
  content.push(PaginationButton({ link: "/", content: String(page + 1) }));
  content.push(PaginationButton({ link: "/", content: "..." }));
  content.push(PaginationButton({ link: "/", content: "99" }));
  content.push(PaginationButton({ link: "/", content: ">" }));

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
    <a href={link}>
      <div className="w-[40px] h-[40px] rounded-full bg-pink-50 flex items-center justify-center">
        {content}
      </div>
    </a>
  );
}

export default function StoryCollection(props: {
  description: string;
  serverURL: string;
  clientURL: string;
  title: string;
  showFilter: boolean;
}) {
  const { title, description, serverURL, clientURL, showFilter } = props;
  const [page, setPage] = useState(1);

  return (
    <div className="lg:flex">
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
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
          <ItemCardV1 />
        </div>
        {PaginationBlock(page)}
      </div>
    </div>
  );
}
