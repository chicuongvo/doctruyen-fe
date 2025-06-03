import ItemCardV2 from "../ItemCard/ItemCardV2";
import ListHeader from "../ListHeader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/api";
export default function ItemListV2(props: { title: string }) {
  const [stories, setStories] = useState<any[]>(
    Array.from({ length: 6 }).fill(0)
  );
  const { title } = props;
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/stories?limit=6&&page=1`
        ).then((res) => res.json());
        if (response.success) setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);
  return (
    <>
      <div className="">
        <ListHeader title={title} link="/stories" />
        <div className="flex gap-2 overflow-auto gap-3 scrollbar-hidden justify-center">
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
