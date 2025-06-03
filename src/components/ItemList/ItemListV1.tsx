import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/api/stories.api";

import ItemCardV1 from "../ItemCard/ItemCardV1";
import ListHeader from "../ListHeader";

export default function ItemListV1(props: {
  showButton: boolean;
  title: string;
}) {
  const { data } = useQuery({
    queryFn: () => getAllStories({ limit: 6, page: 1 }),
    queryKey: ["stories", 1],
  });

  const stories = data?.data.data ?? Array.from({ length: 6 }).fill(0);
  return (
    <div>
      <ListHeader title={props.title} link="/stories" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
        {stories.length > 0 &&
          stories.map((story: any, index: Number) => {
            return <ItemCardV1 key={story.story_id || index} story={story} />;
          })}
      </div>
    </div>
  );
}
