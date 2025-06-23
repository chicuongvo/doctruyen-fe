import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable/DataTable";
import { blogColumns } from "@/components/DataTable/Column";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlogs } from "@/api/blogs.api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

export default function BlogList() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") ?? "";
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogs({ title }),
    queryKey: ["blogs", title],
  });

  const blogs = data?.data?.data;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Button asChild className="ml-auto">
          <Link to="new">
            <Plus className="mr-2 h-4 w-4" />
            Tạo blog
          </Link>
        </Button>
      </div>
      <DataTable
        columns={blogColumns}
        data={blogs}
        searchKey="title"
        searchPlaceholder="Tìm kiếm blogs..."
        total={blogs.length}
        pageCount={1}
        currentPage={1}
      />
    </div>
  );
}
