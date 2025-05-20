import BlogCard from "../ItemCard/BlogCard";
import ListHeader from "../ListHeader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/api";
export default function BlogList(props: { title: string }) {
  const [blogs, setBlogs] = useState<any[]>([1, 2, 3, 4]);
  const { title } = props;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs?limit=4`).then(
          (res) => res.json()
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className="">
      <ListHeader title={title} />
      <div className="blog-items grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {blogs.length > 0 &&
          blogs.map((blog: any) => {
            return <BlogCard blog={blog} />;
          })}
      </div>
    </div>
  );
}
