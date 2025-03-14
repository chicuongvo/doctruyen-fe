import { Link } from "react-router-dom";

const story = {
  title: "Luna Lola: The Moon Wolf",
  genre: "Werewolf",
  age: "18+",
  status: "Completed",
  language: "English",
  author: "Park Kara",
  views: "429.2K",
  rating: 4.7,
  description:
    "\"You're the moon wolf, Lola. You're the wolf with the power of the Moon goddess\", Serena said, and collective gasps were heard in the room. After being rejected by her mate in the Moonlit pack...",
  chapter: {
    content: `
      Lola's POV

      "I, Grayson Dawson, Alpha of the Moonlit pack, reject you, Lola Ashton, as my mate and Luna of this pack," I heard Grayson’s voice reach my ear and a single tear ran down my left cheek as it felt like my heart was being ripped out of my chest.

      Why me? Why am I always on the receiving end of bad things? What have I ever done to deserve this? I wanted to scream and shout at him. I’m his mate, his fated one, and he’s rejecting me because I’m the runt of the pack? More tears ran down my cheeks, and I saw him smile at my misfortune.

      ...
    `,
  },
};

const StoryOverview = () => {
  return (
    <div className="">
      <Link to="/">Home</Link>
      {/* Story Header */}
      <div className="flex flex-col md:flex-row gap-6 bg-dark">
        <div className="md:w-1/3">
          <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Story Cover Placeholder</span>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-[var(--color-dark)]">
            {story.title}
          </h1>
          <p className="text-sm text-gray-600 mt-2">By {story.author}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★</span>
            <span>{story.rating} / 5</span>
            <span className="text-gray-500">({story.views} Views)</span>
          </div>
          <div className="mt-4 text-[#5C5C5C] ">
            <p className="text-primary">
              <strong className="text-[#5C5C5C]">Genre:</strong> {story.genre}
            </p>
            <p>
              <strong>Age:</strong> {story.age}
            </p>
            <p>
              <strong>Status:</strong> {story.status}
            </p>
            <p>
              <strong>Language:</strong> {story.language}
            </p>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {story.description}
          </p>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-black">
        <h2 className="text-2xl font-semibold text-white">
          <strong>Chapter 1</strong>
        </h2>
        <div className="mt-4 text-white leading-relaxed whitespace-pre-wrap">
          {story.chapter.content}
        </div>
      </div>

      {/* Change chapter*/}
      <div className="bg-dark">
        <div>Chapter 1</div>
      </div>
      {/* Suggested story */}
      <div className="bg-dark">
        <h3 className="text-xl font-semibold text-white">You Might Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-transparent p-4 rounded-lg shadow">
              <div className="bg-gray-300 h-32 rounded-lg mb-2"></div>
              <p className="text-white font-medium">story Title {item}</p>
              <p className="text-xs text-gray-500">Author Name</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryOverview;
