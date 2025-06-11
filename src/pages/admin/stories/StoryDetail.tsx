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
      <div className="self-end">
        <Button variant="default" asChild className="mr-3">
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
            <Card className="md:col-span-2 bg-foreground text-background">
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
              <Card className="bg-foreground text-background">
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

              <Card className="bg-foreground text-background">
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
