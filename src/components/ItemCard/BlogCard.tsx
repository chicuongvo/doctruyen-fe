import { Link } from "react-router-dom";
import ImagePlaceHolder from "../../assets/image-placeholder.svg";
export default function BlogCard(props: { blog: any }) {
  const { blog } = props;
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="blog-card font-spartan rounded-xl overflow-hidden bg-zinc-800 shadow-xl">
        <div className="h-[191px] w-full overflow-hidden">
          <img
            src={blog.cover_image || ImagePlaceHolder}
            alt="Ảnh các blog của người dùng đăng"
            className="h-[191px] w-full object-cover hover:scale-115 transition-all duration-500"
          />
        </div>
        <div className="gap-1 flex flex-col px-4 pt-2 pb-4">
          <span className="line-clamp-3 leading-5">{blog.content}</span>
        </div>
      </div>
    </Link>
  );
}
