import BlogImage from "../../assets/item2.webp";

export default function BlogCard() {
  return (
    <a className="blog-card rounded-xl overflow-hidden w-[167px] md:w-[358px] lg:w-[233px] xl:w-[305px] shadow-xl">
      <div className="overflow-hidden">
        <img
          src={BlogImage}
          className="h-[191px] w-full object-cover object-center hover:scale-110 transition-all duration-500"
        />
      </div>
      <div className="gap-1 flex flex-col px-4 pt-2 pb-4">
        <span className="genre text-primary uppercase">Romance</span>
        <span className="line-clamp-3 leading-5">
          Intense Journeys and Forbidden Desires: A Review of "Chained by
          Choice: Slavery Series" by LiL A
        </span>
      </div>
    </a>
  );
}
