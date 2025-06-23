import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataTable } from "@/components/DataTable/DataTable";
import { chapterColumns } from "@/components/DataTable/Column";
import { deleteStory, getStoryById } from "@/api/stories.api";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/date";
import Spinner from "@/components/Spinner";
// import { useToast } from "@/components/ui/use-toast";

// Type definition for the response from the backend
// interface StoryResponse {
//   success: boolean;
//   data: {
//     story_id: string;
//     title: string;
//     author_name: string;
//     description: string;
//     cover_image: string;
//     price: number;
//     status: string;
//     progress: string;
//     published_at: string;
//     like_counts: number;
//     rating_avg: number;
//     story_genres: {
//       genre: {
//         genre_id: string;
//         name: string;
//       };
//     }[];
//     story_comments: any[];
//     story_chapters: any[];
//   };
// }

// interface StoryData {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   synopsis: string;
//   status: string;
//   tags: {
//     genre: {
//       genre_id: string;
//       name: string;
//     };
//   }[];
//   publishedAt: string;
//   coverImage: string;
//   rating: number;
//   reads: number;
//   progress: string;
// }

export default function StoryDetail() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const storyId = params.storyId!;

  const { data, isLoading } = useQuery({
    queryFn: () => getStoryById(storyId),
    queryKey: ["story", storyId],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteStory,
  });

  const storyData = data?.data?.data;
  const storyChapters = storyData?.story_chapters ?? [];
  console.log(storyData);

  const handleDeleteStory = async () => {
    mutate(storyId, {
      onSuccess: () => {
        toast.success("Xóa truyện thành công", {
          onClose() {
            navigate("/admin/stories");
          },
        });
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi xóa truyện");
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <PageHeader
        title={storyData.title}
        description={`${storyData.genre} • ${storyChapters.length} chapters`}
        breadcrumbs={[
          { label: "Stories", to: "/stories" },
          { label: storyData.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/stories">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/stories/${storyData.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <AlertDialog
              open={openDeleteDialog}
              onOpenChange={setOpenDeleteDialog}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Story</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{storyData.title}"? This
                    action cannot be undone and will permanently delete the
                    story and all its chapters.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteStory}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      /> */}
      <div className="self-end">
        <Button variant="outline" asChild className="mr-3">
          <Link to={`edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Link>
        </Button>
        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa truyện</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn chắc chắn muốn xóa truyện "{storyData.title}"? Hành động này
                không thể hoàn tác và sẽ xóa vĩnh viễn truyện cùng tất cả các
                chương.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteStory}
                disabled={isPending}
              >
                {isPending ? "Đang xóa..." : "Xóa"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="chapters">Chương</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Mô tả</CardTitle>
                <CardDescription>Tóm tắt và tổng quan truyện</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert">
                  {storyData.description}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin truyện</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Tác giả</h3>
                    <p className="text-sm">{storyData.author_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Thể loại</h3>
                    <p className="text-sm">
                      {storyData.story_genres
                        .map(
                          ({ genre }: { genre: { name: string } }) => genre.name
                        )
                        .join(", ") || "Không có"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Trạng thái</h3>
                    <p className="text-sm capitalize">
                      {storyData.status === "PUBLISHED"
                        ? "Đã xuất bản"
                        : "Bản nháp"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Tiến độ</h3>
                    <p className="text-sm capitalize">
                      {storyData.progress === "ONGOING"
                        ? "Đang cập nhật"
                        : storyData.progress === "COMPLETED"
                          ? "Hoàn thành"
                          : storyData.progress || "Không rõ"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Ngày xuất bản</h3>
                    <p className="text-sm">
                      {storyData.published_at
                        ? formatDate(storyData.published_at)
                        : "Chưa xuất bản"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ảnh bìa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/3] relative overflow-hidden rounded-md">
                    <img
                      src={storyData.cover_image || "/placeholder.svg"}
                      alt={`Ảnh bìa cho ${storyData.title}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">Chương</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link to={`/admin/stories/${storyData.story_id}/chapters/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm chương
                </Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Tất cả chương</CardTitle>
              <CardDescription>Quản lý các chương của truyện</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={chapterColumns}
                data={storyChapters}
                searchKey="title"
                searchPlaceholder="Tìm kiếm chương..."
                total={storyChapters?.length}
                pageCount={1}
                currentPage={1}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
