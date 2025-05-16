import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../components/Tag";
import Comment from "../components/Comment";
import Chapter from "../components/Chapter";

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

interface CommentData {
  user_id: string;
  content: string;
}

const StoryOverview = () => {
  const { id } = useParams();
  const [story, setStory] = useState<StoryData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(
          `https://doctruyen-be-e0t7.onrender.com/api/stories/${id}`
        );
        setStory(res.data.data);
        setComments(res.data.data.story_comments);
      } catch (error) {
        console.error("Không thể lấy dữ liệu truyện", error);
      }
    };

    fetchStory();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const response = await axios.post(
          `https://doctruyen-be-e07.onrender.com/api/stories/${id}/comment`,
          {
            content: newComment,
          }
        );

        if (response.status === 200 || response.status === 201) {
          setComments([
            ...comments,
            { user_id: "Bạn", content: response.data.content || newComment },
          ]);
          setNewComment("");
        } else {
          console.error("Failed to add comment:", response.statusText);
        }
      } catch (error: any) {
        console.error("Error adding comment:", error.message);
      }
    }
  };
  const handleReadChapter1 = () => {
    navigate(`/story/${id}/${1}`);
  };

  if (!story) {
    return <div className="text-white p-8">Đang tải...</div>;
  }

  return (
    <div className="bg-black p-4 md:p-8 text-white">
      {/* Phần giới thiệu */}
      <div className="flex flex-col md:flex-row p-4 md:p-8 rounded-xl dark:border-zinc-700 dark:bg-zinc-800 gap-6 md:gap-8 mt-4">
        {/* Ảnh bìa */}
        <div className="md:max-w-md mx-auto md:mx-0 flex-shrink-0">
          <div className="w-full h-[360px] bg-black flex items-center justify-center rounded-lg">
            <img
              src={story.cover_image}
              alt="Bìa truyện"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Thông tin truyện */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{story.title}</h1>

            <div className="text-[#A1A1A1] space-y-1">
              <p>
                <span className="font-semibold text-white">Tác giả:</span>{" "}
                {story.author_name}
              </p>
              <p>
                <span className="font-semibold text-white">Tiến độ:</span>{" "}
                {story.progress}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {story.story_genres.map((g) => (
                <Tag key={g.genre.genre_id} label={g.genre.name} />
              ))}
            </div>

            <p className="text-gray-300 break-words leading-relaxed">
              {story.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition"
              onClick={handleReadChapter1}
            >
              Đọc Chương 1
            </button>

            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-300 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition">
              Đọc Tiếp
            </button>

            <button className="flex-1 bg-gradient-to-r from-pink-500 to-pink-300 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition">
              Thêm Vào Yêu Thích
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
              user_id={comment.user_id}
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
    </div>
  );
};

export default StoryOverview;
