import x from "../assets/search.svg";
import StoryCollection from "../components/StoryCollection";

const tags = [
  "Prince / Princess",
  "Optimist",
  "Independent",
  "Sweet",
  "Kickass",
  "Heroine",
  "Contract Marriage",
  "Bad Boy",
  "Ex",
  "Fake Dating",
  "Best Friends",
  "Rebirth",
  "Mafia",
  "Male Lead",
  "Wife",
  "Virgin",
];
function Search() {
  return (
    <div className="search-page py-8 px-[1rem] max-w-screen-xl mx-auto">
      <div className="search-block flex flex-col shadow-xl p-10">
        <div className="mb-2 relative">
          <span className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5 bg-no-repeat bg-contain"></span>
          <input
            className="w-full border-1 py-2 rounded-xl px-15"
            placeholder="Search Novel title or Tag"
          />
        </div>
        <div className="top-tags-block">
          <h2 className="mb-2">Top Tags</h2>
          <div className="flex flex-wrap gap-4">
            {tags.map((value) => {
              return (
                <a
                  href="/"
                  id={value}
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-sm font-light"
                >
                  {value}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="top-movies p-4 md:p-8 ">
        <StoryCollection
          description=""
          title=""
          serverURL=""
          clientURL=""
          showFilter={false}
        />
      </div>
    </div>
  );
}

export default Search;
