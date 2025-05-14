import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "../../../api/stories.api";
import Spinner from "../../../components/Spinner";
import { DataTable } from "@/components/DataTable/DataTable";
import { storyColumns } from "@/components/DataTable/Column";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Story {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  cover_image: string;
  price: number;
  status: "PUBLISHED" | "DRAFT";
  progress: string;
  story_genres: string[];
  story_chapters: any;
  published_at: string;
  like_counts: number;
  rating_avg: number;
  story_comments: any[];
}

function StoryList() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const limit = 10;
  const title = searchParams.get("title") ?? "";

  const { data, isLoading } = useQuery({
    queryFn: () => getAllStories({ page: currentPage, limit, title }),
    queryKey: ["stories", currentPage, limit, title],
  });

  const stories = data?.data?.data as Story[];
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex">
        <Button asChild className="ml-auto">
          <Link to="new">
            <Plus className="mr-2 h-4 w-4" />
            New Story
          </Link>
        </Button>
      </div>
      <DataTable
        columns={storyColumns}
        data={stories}
        searchKey="title"
        searchPlaceholder="Search stories..."
        pageCount={Math.ceil(data?.data?.total / limit)}
        currentPage={currentPage}
        total={data?.data?.total}
      />
    </>
  );
}

export default StoryList;
