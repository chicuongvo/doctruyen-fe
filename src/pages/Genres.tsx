import StoryCollection from "../components/StoryCollection";

function Genres() {
  return (
    <div className="bg-black">
      <div className="max-w-screen-xl mx-auto p-2 text-white">
        <StoryCollection
          title=""
          showFilter={true}
          clientURL="/"
          serverURL="/"
        />
      </div>
    </div>
  );
}

export default Genres;
