import { Link } from "react-router-dom";
import Chapter from "../components/Chapter";

import { useEffect, useRef } from "react";
interface Chapter {
  storyId: string;
  title: string;
  chapterNumber: number;
  content: string;
  status: "DRAFT" | "PUBLISHED";
}

const currentChapter: Chapter = {
  storyId: "cm7zib9j10007e3sw5li3t75o",
  title: "Who are you?",
  chapterNumber: 9,
  content: "New chapter content",
  status: "DRAFT",
};

const chapters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const storyId: string = "bachtuyet";

const Story = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const currentChapterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current && currentChapterRef.current) {
      const parent = listRef.current;
      const child = currentChapterRef.current;

      parent.scrollTo({
        top: child.offsetTop - parent.offsetTop,
        behavior: "smooth",
      });
    }

    window.scrollTo(0, 0);
  }, [currentChapter]);

  return (
    <div className="bg-black p-8 text-white">
      <Link to="/">Home</Link>

      {/* Chapter Content */}
      <div className="p-8 max-w-[800px] w-full m-auto max-md:p-4 overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 max-md:text-2xl text-white">
          <strong>Chapter 1</strong>
        </h2>
        <div className=" text-white leading-relaxed whitespace-pre-wrap text-xl mb-8">
          {currentChapter.content}
        </div>
      </div>

      {/*Next And Previous Chapter*/}

      <div className="flex justify-center gap-4">
        {/* Previous Chapter Button */}
        {currentChapter.chapterNumber >= 1 && (
          <button className="flex items-center justify-center w-55 h-13 gap-2 px-6 py-3 rounded-xl text-purple-400 font-medium border-2 border-purple-400 transition-all duration-300 hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-400 hover:border-purple-600">
            <span className="flex justify-center gap-1 leading-none">
              <svg
                className="w-5 h-5 stroke-purple-400 transition-all duration-300 hover:stroke-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="transition-all duration-300">
                Previous Chapter
              </span>
            </span>
          </button>
        )}

        {/* Next Chapter Button */}

        <button className="flex items-center justify-center w-55 h-13 gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 hover:from-purple-400 hover:to-purple-600">
          <span className="flex justify-center gap-1 leading-none">
            Next Chapter
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </span>
        </button>
      </div>

      {/* All chapters */}

      <div className="bg-dark text-white p-6 rounded-xl mt-15">
        <h2 className="text-2xl font-bold mb-4">All chapters</h2>

        <div
          ref={listRef}
          className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto"
        >
          {chapters.map((chapter: number) => (
            <div
              key={chapter}
              ref={
                chapter === currentChapter.chapterNumber
                  ? currentChapterRef
                  : null
              }
              className={` ${chapter === currentChapter.chapterNumber ? "text-primary" : ""}`}
            >
              <Chapter storyId={storyId} number={chapter} />
            </div>
          ))}
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

export default Story;
