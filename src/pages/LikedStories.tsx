import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LikedStoriesSkeleton from "../components/LikedStoriesSkeleton";
import ItemCardV2 from "../components/ItemCard/ItemCardV2";

interface StoryData {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  cover_image: string;
  story_genres: {
    genre: {
      genre_id: string;
      name: string;
    };
  }[];
}

interface StoryLike {
  story_id: string;
  liked_at: string;
}

interface UserData {
  story_likes: StoryLike[];
}

const LikedStories = () => {
  const [likedStories, setLikedStories] = useState<StoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchLikedStories = async () => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        if (userResponse.data.success) {
          setIsAuthenticated(true);
          const userData = userResponse.data.data as UserData;
          const storyLikes = userData.story_likes;

          if (!storyLikes || storyLikes.length === 0) {
            setLikedStories([]);
            setLoading(false);
            return;
          }

          const storyPromises = storyLikes.map((like: StoryLike) =>
            axios.get(`${API_BASE_URL}/stories/${like.story_id}`)
          );

          const responses = await Promise.all(storyPromises);
          const stories = responses.map((res) => res.data.data);
          setLikedStories(stories);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked stories:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    fetchLikedStories();
  }, []);

  if (loading) {
    return <LikedStoriesSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-black min-h-screen p-8 text-white dark:bg-white dark:text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Vui lòng đăng nhập</h1>
          <p className="text-zinc-400 mb-6 dark:text-zinc-600">
            Bạn cần đăng nhập để xem danh sách truyện yêu thích
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-500 cursor-pointer shadow-lg"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black p-8 text-white dark:bg-white dark:text-black">
      <h1 className="text-3xl font-bold mb-8">Truyện yêu thích</h1>
      {likedStories.length === 0 ? (
        <div className="text-center text-gray-400">
          <p className="text-xl">Bạn chưa có truyện yêu thích nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {likedStories.map((story) => (
            <ItemCardV2 key={story.story_id} story={story} showTags={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedStories;
