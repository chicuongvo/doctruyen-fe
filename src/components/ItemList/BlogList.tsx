import BlogCard from "../ItemCard/BlogCard";
import ListHeader from "../ListHeader";

export default function BlogList(props: {
  showButton: boolean;
  title: string;
}) {
  const { showButton, title } = props;

  return (
    <div>
      <ListHeader title={title} showButton={showButton} />
      <div className="blog-items grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
