export default function BlogCard(props: { blog: any }) {
  const { blog } = props;
  return (
    <a className="blog-card rounded-xl overflow-hidden w-[167px] md:w-[358px] lg:w-[233px] xl:w-[305px] shadow-xl">
      <img
        src={blog.cover_image}
        alt="Ảnh các blog của người dùng đăng"
        className="h-[191px] w-full object-cover hover:scale-115 transition-all duration-500"
      />
      <div className="gap-1 flex flex-col px-4 pt-2 pb-4">
        {/* <span className="genre text-primary uppercase">Romance</span> */}
        <span className="line-clamp-3 leading-5">{blog.content}</span>
      </div>
    </a>
  );
}
