import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "@/components/Spinner";

type Author = {
  username: string;
};

type BlogPost = {
  blog_id: string;
  title: string;
  description: string;
  content: string;
  cover_image: string;
  created_at: string;
  author: Author;
};

type Story = {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  cover_image: string;
  price: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | string;
  progress: "ON_GOING" | "COMPLETED" | "HIATUS" | string;
  published_at: string;
  like_counts: number;
  rating_avg: number | null;
};

const shuffleArray = (array: Story[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const extractDescription = (content: string) => {
  const breakPoint = content.indexOf("\n\n\n");
  if (breakPoint === -1) {
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  }
  return content.slice(0, breakPoint).trim();
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const blogsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs`
        );
        console.log("Blogs data:", blogsResponse.data.data);
        const formattedBlogs = blogsResponse.data.data.map(
          (blog: BlogPost) => ({
            ...blog,
            description: extractDescription(blog.content),
          })
        );
        setBlogs(formattedBlogs || []);

        const storiesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/stories`
        );
        console.log("Stories data:", storiesResponse.data.data);
        setStories(storiesResponse.data.data || []);
      } catch (err) {
        setError("Không thể lấy dữ liệu. Vui lòng thử lại sau.");
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  if ((blogs.length === 0 || stories.length === 0) && !error) {
    return <Spinner />;
  }

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  const randomStories = shuffleArray(stories).slice(0, 6);

  return (
    <div className="w-full bg-zinc-900 text-white min-h-screen px-4 sm:px-6 md:px-12 py-6 sm:py-8 dark:bg-zinc-100 dark:text-black">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
        Blogs
      </h1>

      <div className="max-w-7xl mx-auto space-y-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.blog_id}
            className="w-full h-80 sm:h-60 bg-zinc-800 dark:bg-zinc-200 rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row group  transition-transform duration-300"
          >
            <div className="relative w-full h-1/2 sm:h-full sm:w-80 h-48 sm:h-56 overflow-hidden rounded-sm">
              <img
                src={blog.cover_image}
                alt={`Hình bìa cho ${blog.title}`}
                className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-1400"
              />
              <p className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {new Date(blog.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="p-4 sm:p-6 flex flex-col justify-between w-full h-auto sm:h-full ">
              <div>
                <p className="text-sm text-zinc-400">
                  By {blog.author.username}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-zinc-300  dark:text-zinc-700 text-sm pt-2 line-clamp-3 lg:line-clamp-4">
                  {blog.description}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/blog/${blog.blog_id}`}
                  className="mt-2 sm:mt-4 px-4 sm:px-5 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition duration-300 self-start"
                >
                  Đọc ngay →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8">
        <button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer dark:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-400  ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full cursor-pointer transition-all duration-400 ${
              currentPage === index + 1
                ? "bg-purple-600 text-white"
                : "bg-zinc-700 hover:bg-zinc-600  dark:bg-zinc-300 dark:hover:bg-zinc-400 "
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer dark:bg-zinc-300 dark:hover:bg-zinc-400 transition-all duration-400 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto bg-zinc-800 dark:bg-zinc-200 rounded-lg shadow-md p-4 sm:p-6 border border-zinc-700 dark:border-zinc-300 mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white dark:text-black">
          Truyện phổ biến bạn có thể thích
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {randomStories.map((story) => (
            <div key={story.story_id} className="w-full">
              <div className="w-full aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={story.cover_image}
                  alt={`Hình bìa cho ${story.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-2 sm:mt-3 text-center flex flex-col h-full">
                <h3 className="text-sm sm:text-lg font-bold text-white dark:text-black line-clamp-2 ">
                  {story.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm ">
                  {story.like_counts} Yêu thích
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
