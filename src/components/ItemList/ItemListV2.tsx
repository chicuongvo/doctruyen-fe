import ItemCardV2 from "../ItemCard/ItemCardV2";
import ListHeader from "../ListHeader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/api";
export default function ItemListV2(props: { title: string }) {
  const [stories, setStories] = useState<[]>([]);
  const { title } = props;
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/stories?limit=6&&page=3`
        ).then((res) => res.json());
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);
  return (
    <>
      <div className="">
        <ListHeader title={title} />
        <div className="flex gap-2 overflow-auto gap-3 scrollbar-hidden justify-center">
          {stories.length > 0 &&
            stories.map((story: any) => {
              return <ItemCardV2 showTags={false} story={story} />;
            })}
        </div>
      </div>
    </>
  );
}
