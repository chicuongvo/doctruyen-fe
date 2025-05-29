import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../components/Tag";
import Comment from "../components/Comment";
import Chapter from "../components/Chapter";
import { useUser } from "../contexts/userContext";
import StorySkeleton from "../components/StorySkeleton";
import { motion } from "framer-motion";
import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Genre {
  genre: {
    genre_id: string;
    name: string;
  };
}

interface ChapterData {
  chapter_id: string;
  title: string;
  chapter_number: number;
  status: string;
  published_at: string;
  story_id: string;
}

interface StoryData {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  price: number;
  status: string;
  progress: string;
  story_genres: Genre[];
  cover_image: string;
  story_chapters: ChapterData[];
  rating_avg: number;
}

interface UserData {
  username: string;
}
interface CommentData {
  comment_id: string;
  commented_at: string;
  content: string;
  story_id: string;
  user: UserData;
  user_id: string;
}

const StoryOverview = () => {
  const id = useParams().id || "1";
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [story, setStory] = useState<StoryData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [similarStories, setSimilarStories] = useState<StoryData[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/stories/${id}`);
        setStory(res.data.data);
        setComments(res.data.data.story_comments);

        const similarRes = await axios.get(
          `${API_BASE_URL}/stories/${id}/similar`
        );
        setSimilarStories(similarRes.data.data.slice(0, 6));

        if (userProfile) {
          const likedRes = await axios.get(
            `${API_BASE_URL}/stories/${id}/like`,
            {
              withCredentials: true,
            }
          );
          setIsLiked(likedRes.data.data);
        }
      } catch (error) {
        console.error("Error getting story data", error);
      }
    };

    fetchStory();
  }, [id, userProfile]);

  useEffect(() => {
    if (showLoginWarning) {
      const timer = setTimeout(() => {
        setShowLoginWarning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLoginWarning]);

  const handleAddComment = async () => {
    if (userProfile === null) {
      setShowLoginWarning(true);
      return;
    }

    if (newComment.trim() !== "") {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/stories/${id}/comment`,
          {
            content: newComment,
          },
          {
            withCredentials: true,
          }
        );

        if (
          (res.status === 200 || res.status === 201) &&
          res.data.success &&
          userProfile
        ) {
          const newCommentData = res.data.data;

          const updatedComment = {
            comment_id: newCommentData.comment_id,
            commented_at: newCommentData.commented_at,
            content: newCommentData.content,
            user_id: newCommentData.user_id,
            story_id: newCommentData.story_id,
            user: { username: userProfile.username },
          };

          setComments([...comments, updatedComment]);
          setNewComment("");
        } else {
          console.error("Failed to add comment:", res.statusText);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleReadChapter1 = () => {
    navigate(`/story/${id}/${1}`);
  };

  const handleReadLastChapter = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    navigate(`/story/${id}/${savedProgress[id] || "1"}`);
  };

  const handleLike = async () => {
    if (!userProfile) {
      setShowLoginWarning(true);
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/stories/${id}/like`,
        {},
        { withCredentials: true }
      );

      const likedRes = await axios.get(`${API_BASE_URL}/stories/${id}/like`, {
        withCredentials: true,
      });
      setIsLiked(likedRes.data.data);
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (!story || !similarStories) {
    return <StorySkeleton />;
  }

  return (
    <div className="bg-black p-4 md:p-8 text-white">
      {showLoginWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-2xl"
        >
          <div
            role="alert"
            className="alert alert-warning shadow-lg p-4 md:p-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-base md:text-lg">Vui lòng đăng nhập!</span>
          </div>
        </motion.div>
      )}
      {/* Phần giới thiệu */}
      <div className="flex flex-col md:flex-row p-4 md:p-8 rounded-xl bg-zinc-800 gap-6 md:gap-8 mt-4">
        {/* Ảnh bìa */}
        <div className="md:max-w-md mx-auto md:mx-0 flex-shrink-0">
          <div className="w-full h-[360px] flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={story.cover_image}
              alt={story.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Thông tin truyện */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{story.title}</h1>

            <div className="text-white space-y-1">
              <p>
                <span className="font-semibold text-zinc-400">Tác giả:</span>{" "}
                {story.author_name}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">Tiến độ:</span>{" "}
                {story.progress === "ON_GOING" ? "Đang cập nhật" : "Hoàn thành"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {story.story_genres.map((g) => (
                <Tag key={g.genre.genre_id} label={g.genre.name} />
              ))}
            </div>

            <div className="space-y-2">
              <p
                className={`text-zinc-400 break-words leading-relaxed ${!isDescriptionExpanded && "line-clamp-3"}`}
              >
                {story.description}
              </p>
              {story.description.length > 200 && (
                <button
                  onClick={toggleDescription}
                  className="text-purple-600 hover:opacity-80 transition-opacity"
                >
                  {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition"
              onClick={handleReadChapter1}
            >
              Đọc Chương 1
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-purple-400 to-purple-200 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition"
              onClick={handleReadLastChapter}
            >
              Đọc Tiếp
            </button>

            <button
              className={`flex-1 bg-gradient-to-r ${isLiked ? "from-purple-200 to-purple-600" : "from-purple-600 to-purple-400"} text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition`}
              onClick={handleLike}
            >
              {isLiked ? "Đã Yêu Thích" : "Thêm Vào Yêu Thích"}
            </button>
          </div>
        </div>
      </div>
      {/* Danh sách chương */}
      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Tất cả các chương</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
          {story.story_chapters.map((chapter) => (
            <Chapter
              key={chapter.chapter_id}
              id={story.story_id}
              chapter={chapter.chapter_number}
            />
          ))}
        </div>
      </div>
      {/* Bình luận */}

      <div className="bg-zinc-900 text-white p-6 rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
        <div className="flex flex-col space-y-3 max-h-[300px] overflow-y-auto">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              username={comment.user.username || "Ẩn danh"}
              content={comment.content}
            />
          ))}
        </div>

        {/* Thêm bình luận */}
        <div className="mt-6">
          <label className="text-xl font-bold text-gray-300 block mb-2">
            Viết bình luận của bạn
          </label>
          <textarea
            className="w-full p-4 h-32 rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Bình luận lịch sự nhé!"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
            onClick={handleAddComment}
          >
            Gửi
          </button>
        </div>
      </div>

      {/* Suggested story */}
      <div className="bg-zinc-900 mt-8 p-6 rounded-xl">
        <h3
          className="text-3xl font-bold text-white mb-8"
          style={{ fontFamily: "inherit" }}
        >
          Có thể bạn cũng thích
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {similarStories.map((story) => (
            <div
              key={story.story_id}
              onClick={() =>
                (window.location.href = `/story/${story.story_id}`)
              }
              className="item-card-v2 rounded-lg font-spartan flex-none w-[116px] md:w-[186px] cursor-pointer"
            >
              <div className="relative h-[160px] md:h-[260px] bg-gray-900 rounded-lg overflow-hidden">
                <img
                  className="object-cover object-center rounded-lg w-[116px] md:w-[186px] h-[160px] md:h-[260px]"
                  src={story.cover_image}
                  alt="Ảnh bìa truyện tranh"
                />
              </div>
              <div className="">
                <span className="line-clamp-2 min-h-[3rem]">{story.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryOverview;
