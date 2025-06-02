import ItemCardV1 from "../ItemCard/ItemCardV1";
import ListHeader from "../ListHeader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/api";
export default function ItemListV1(props: {
  showButton: boolean;
  title: string;
}) {
  const [stories, setStories] = useState<any[]>(
    Array.from({ length: 6 }).fill(0)
  );

  console.log(stories.length);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stories?limit=6`).then(
          (res) => res.json()
        );
        if (response.success) setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);
  return (
    <div>
      <ListHeader title={props.title} link="/stories" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
        {stories.length > 0 &&
          stories.map((story: any) => {
            return <ItemCardV1 key={story.id} story={story} />;
          })}
      </div>
    </div>
  );
}
