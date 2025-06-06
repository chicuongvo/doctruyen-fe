import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

type Author = {
  username: string;
};

type Blog = {
  blog_id: string;
  title: string;
  created_at: string;
  author: Author;
  content: string;
  cover_image: string;
};

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [suggestedBlogs, setSuggestedBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`
        );
        console.log("Blog data:", blogResponse.data.data);
        setBlog(blogResponse.data.data);

        const blogsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs`
        );
        console.log("Suggested blogs data:", blogsResponse.data.data);
        const filteredBlogs = blogsResponse.data.data
          .filter((b: Blog) => b.blog_id !== id)
          .slice(0, 4);
        setSuggestedBlogs(filteredBlogs);
      } catch (err) {
        setError("Không thể lấy blog. Vui lòng thử lại sau.");
        console.error("Error:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">
        {error || "Không tìm thấy blog"}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-1">
        <div className="w-full lg:w-3/4 lg:pr-6 lg:border-r lg:border-zinc-700 dark:border-zinc-300">
          <p className="text-m font-bold text-zinc-400 mb-8 dark:text-zinc-600">
            <Link
              to="/blogs"
              className="hover:text-secondary transition-all duration-400"
            >
              Blog /{" "}
            </Link>
            {blog.title}
          </p>
          <div className="prose prose-invert max-w-none text-lg leading-loose bg-zinc-800 dark:bg-zinc-200 p-8 rounded-xl shadow-md">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-sm text-secondary mb-6">
              By{" "}
              <span className="text-primary font-semibold">
                {blog.author.username}
              </span>{" "}
              — {new Date(blog.created_at).toLocaleDateString("vi-VN")}
            </p>
            {blog.content.split("\n").map((paragraph, index) => (
              <p
                key={index}
                className={/^\d+\./.test(paragraph) ? "font-bold mb-3" : "mb-5"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/4 lg:pl-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Gợi ý thêm
          </h2>
          <div className="space-y-6">
            {suggestedBlogs.map((b) => (
              <Link to={`/blog/${b.blog_id}`} key={b.blog_id} className="block">
                <div className="bg-zinc-800 dark:bg-zinc-200 dark:text-black rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    src={b.cover_image}
                    alt={b.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="font-semibold text-base text-white dark:text-black line-clamp-2">
                      {b.title}
                    </p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-600 ">
                      {new Date(b.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
