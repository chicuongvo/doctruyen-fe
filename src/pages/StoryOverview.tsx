import { Link } from "react-router-dom";
import Tag from "../components/Tag";
import Comment from "../components/Comment";
import Chapter from "../components/Chapter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Story {
  title: string;
  author_name: string;
  description: string;
  price: number;
  status: string;
  progress: string;
  genres: string[];
  cover_image: string;
  age: string;
  language: string;
  views: string;
  rating: number;
}

interface CommentData {
  user: string;
  text: string;
}

const story: Story = {
  title: "Luna Lola: The Moon Wolf",
  author_name: "Park Kara",
  description:
    "\"You're the moon wolf, Lola. You're the wolf with the power of the Moon goddess\", Serena said, and collective gasps were heard in the room. After being rejected by her mate in the Moonlit pack...",
  price: 10,
  status: "PUBLISHED",
  progress: "ON_GOING",
  genres: ["Action", "Fantasy"],
  cover_image: "image_link",
  age: "18+",
  language: "English",
  views: "429.2K",
  rating: 4.7,
};

const chapters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const comments: CommentData[] = [
  { user: "Alice", text: "This is a short comment." },
  {
    user: "Bob",
    text: "This is a longer comment that will be truncated. It has more than 100 characters, so a 'See more' button should appear to expand the text when needed.",
  },
  { user: "Charlie", text: "Nice post!" },
  {
    user: "David",
    text: "I totally agree with your points. The way you explained it was really insightful and provided a lot of useful information.",
  },
  { user: "Eve", text: "Great analysis! Thanks for sharing!" },
  { user: "Frank", text: "I think there’s another perspective to consider..." },
];

const storyId: string = "bachtuyet";

const StoryOverview = () => {
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      //onAddComment({ user: "You", text: newComment });
      setNewComment("");
    }
  };

  const handleReadChapter1 = () => {
    navigate(`/story/${storyId}/${1}`);
  };
  const navigate = useNavigate();
  return (
    <div className="bg-black p-8 text-white">
      <Link to="/">Home</Link>
      {/* Story Header */}
      <div className="flex flex-row p-8 rounded-xl dark:border-zinc-700 dark:bg-zinc-800 gap-8 ">
        <div className="md:w-1/3 ">
          <div className="bg-gray-300 h-100 w-70 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Story Cover Placeholder</span>
          </div>
        </div>
        <div className="leading-loose">
          <h1 className="text-3xl font-bold text-white">{story.title}</h1>

          <div className="mt-4 text-[#5C5C5C] ">
            <p className="text-primary">
              <span className="text-[#5C5C5C]">Genre:</span> {story.genres[0]}
            </p>
            <p>
              <span>Age:</span> <span className="text-white">{story.age}</span>
            </p>
            <p>
              <span>progress:</span>{" "}
              <span className="text-white">{story.progress}</span>
            </p>
            <p>
              <span>Language:</span>{" "}
              <span className="text-white">{story.language}</span>
            </p>
            <p>
              <span>Author:</span>{" "}
              <span className="text-white">{story.author_name}</span>
            </p>
          </div>

          {/*All tags*/}
          <div className="flex flex-wrap gap-2 items-center mt-4">
            {story.genres.map((label) => (
              <Tag label={label} />
            ))}
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {story.description}
          </p>

          {/*Reading and bookmark button*/}
          <div className="flex gap-4 justify-between h-15 mt-4">
            {/* Read Chapter 1 button */}
            <button
              className="flex flex-1 items-center justify-center bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition"
              onClick={handleReadChapter1}
            >
              Read Chapter 1
            </button>

            {/* Continue read button */}
            <button className="flex flex-1 items-center justify-center bg-gradient-to-r from-blue-500 to-blue-300 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition">
              Continue Reading
            </button>

            {/* Bookmark Button */}

            <button className="flex flex-1 items-center justify-center bg-gradient-to-r from-pink-500 to-pink-300 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition">
              Add To Favorite
            </button>
          </div>
        </div>
      </div>

      {/* All chapters */}
      <div className="bg-dark text-white p-6 rounded-xl mt-15">
        <h2 className="text-2xl font-bold mb-4"> All chapters </h2>
        <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {chapters.map((chapter: number) => (
            <Chapter key={chapter} storyId={storyId} number={chapter} />
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div className="p-6 rounded-xl bg-dark text-white mt-15">
        <h2 className="text-2xl font-bold">Comments</h2>

        <div className="flex flex-col justify-start space-y-3 mt-5 overflow-y-auto max-h-[300px]">
          {comments.map((comment, index) => (
            <Comment key={index} user={comment.user} text={comment.text} />
          ))}
        </div>

        <div className=" relative flex flex-col mt-4 space-y-2">
          <label className="text-xl font-bold text-gray-400">
            Write your comment
          </label>
          <div className="flex space-y-2">
            <textarea
              className="w-260 p-4 h-32 rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Please comment nicely!"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="absolute bottom-2 right-2">
              <button
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                onClick={handleAddComment}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested story */}
      <div className="bg-dark mt-15 p-8 rounded-xl">
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
