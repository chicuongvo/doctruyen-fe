import { useNavigate, useParams } from "react-router-dom";
import Chapter from "../components/Chapter";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import StoryReadingSkeleton from "../components/StoryReadingSkeleton";
import ItemCardV2 from "../components/ItemCard/ItemCardV2";
import ChangeFontSize from "@/components/ChangeFontSize";
// import ChangeFontSize from "@/components/ChangeFontSize";

interface ChapterData {
  chapter_id: string;
  title: string;
  chapter_number: number;
  status: string;
  published_at: string;
  story_id: string;
  content: string;
}

interface StoryData {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  price: number;
  status: string;
  progress: string;
  story_genres: any[];
  cover_image: string;
  story_chapters: ChapterData[];
  rating_avg: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Story = () => {
  const navigate = useNavigate();

  const id = useParams().id || "1";
  const chapter = useParams().chapter || "1";
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [similarStories, setSimilarStories] = useState<StoryData[]>([]);
  const [currentChapter, setCurrentChapter] = useState<ChapterData>({
    chapter_id: "",
    title: "",
    chapter_number: 0,
    status: "",
    published_at: "",
    story_id: "",
    content: "",
  });
  const listRef = useRef<HTMLDivElement | null>(null);
  const currentChapterRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    window.scrollTo(0, 0);
    setChapters([]);
    setSimilarStories([]);
  }, [chapter]);

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
  }, [chapter]);

  useEffect(() => {
    const fetchStory = async () => {
      const chapterNumber = parseInt(chapter || "1", 10);
      try {
        const res = await axios.get(`${API_BASE_URL}/stories/${id}`);

        setChapters(res.data.data.story_chapters);
        setCurrentChapter(res.data.data.story_chapters[chapterNumber - 1]);

        const similarRes = await axios.get(
          `${API_BASE_URL}/stories/${id}/similar`
        );
        setSimilarStories(similarRes.data.data.slice(0, 6));
      } catch (error) {
        console.error("Error getting story data", error);
      }
    };

    fetchStory();
  }, [id, chapter]);

  useEffect(() => {
    const currentChapter: string = chapter;
    const mangaId: string = id;

    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    savedProgress[mangaId] = currentChapter;

    localStorage.setItem("readingProgress", JSON.stringify(savedProgress));
  }, [id, chapter]);
  const handlePreviousChapter = () => {
    const chapterNumber = parseInt(chapter || "1", 10);
    navigate(`/story/${id}/${chapterNumber - 1}`);
  };

  const handleNextChapter = () => {
    const chapterNumber = parseInt(chapter || "1", 10);
    navigate(`/story/${id}/${chapterNumber + 1}`);
  };

  if (!chapters.length) {
    return <StoryReadingSkeleton />;
  }

  return (
    <div className="bg-black p-8 text-white font-spartan dark:bg-white dark:text-black relative">
      <div className="sticky top-20  z-50 flex justify-end">
        <ChangeFontSize fontSize={fontSize} setFontSize={setFontSize} />
      </div>

      {/* Chapter Content */}
      <div className="max-w-[800px] w-full m-auto mb-8 ">
        <div className="bg-zinc-800 rounded-xl p-4 dark:bg-zinc-200">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white dark:text-black">
              Nghe truyện
            </h3>
          </div>
          <audio
            controls
            className="w-full"
            src={`${API_BASE_URL}/chapters/${currentChapter.chapter_id}/audio`}
          />
        </div>
      </div>
      <div className="p-8 max-w-[800px] w-full m-auto max-md:p-4 overflow-hidden">
        <h2 className="text-3xl font-bold mb-8 max-md:text-2xl text-white dark:text-black">
          <strong>Chương {currentChapter.chapter_number}: </strong>
          <strong>{currentChapter.title}</strong>
        </h2>
        <div
          className={`text-white leading-relaxed whitespace-pre-wrap mb-8 dark:text-black`}
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
        >
          {currentChapter.content}
        </div>
      </div>
      {/*Next And Previous Chapter*/}
      <div className="flex justify-center gap-4 mb-8">
        {/* Previous Chapter Button */}
        {currentChapter.chapter_number > 1 && (
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 hover:from-purple-400 hover:to-purple-600"
            onClick={handlePreviousChapter}
          >
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
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span>Chương Trước</span>
          </button>
        )}

        {/* Next Chapter Button */}
        {currentChapter.chapter_number < chapters.length && (
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 hover:from-purple-400 hover:to-purple-600"
            onClick={handleNextChapter}
          >
            <span>Chương Sau</span>
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
          </button>
        )}
      </div>
      {/* All chapters */}
      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-10 dark:bg-zinc-100 dark:text-black">
        <h2 className="text-2xl font-bold mb-4">Tất cả các chương</h2>

        <div
          ref={listRef}
          className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto"
        >
          {chapters.map((chapter: ChapterData) => (
            <div
              ref={
                chapter.chapter_number === currentChapter.chapter_number
                  ? currentChapterRef
                  : null
              }
              className={`${chapter.chapter_number === currentChapter.chapter_number ? "text-purple-600" : ""}`}
            >
              <Chapter
                key={chapter.chapter_id}
                id={id}
                chapter={chapter.chapter_number}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Suggested story */}
      <div className="bg-zinc-900 mt-8 p-6 rounded-xl dark:bg-zinc-100 dark:text-black">
        <h3 className="text-3xl font-bold text-white mb-8 dark:text-black">
          Có thể bạn cũng thích
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {similarStories.map((story) => (
            <ItemCardV2 key={story.story_id} story={story} showTags={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
