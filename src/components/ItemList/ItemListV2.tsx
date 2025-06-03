import ItemCardV2 from "../ItemCard/ItemCardV2";
import ListHeader from "../ListHeader";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/api/stories.api";

export default function ItemListV2(props: { title: string }) {
  const { title } = props;

  const { data } = useQuery({
    queryFn: () => getAllStories({ limit: 6, page: 1 }),
    queryKey: ["stories", 1],
  });

  const stories = data?.data.data ?? Array.from({ length: 6 }).fill(0);

  return (
    <>
      <div className="">
        <ListHeader title={title} link="/stories" />
        <div className="flex overflow-auto gap-3 scrollbar-hidden justify-center">
          {stories.map((story: any, index: Number) => {
            return (
              <ItemCardV2
                key={story.story_id || index}
                showTags={false}
                story={story}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
