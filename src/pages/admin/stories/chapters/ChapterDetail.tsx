import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getChapterById, deleteChapter } from "@/api/stories.api";
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
import { Textarea } from "@/components/ui/textarea";

// interface ChapterData {
//   chapter_id: string;
//   story_id: string;
//   storyTitle: string;
//   title: string;
//   chapter_number: number;
//   status: string;
//   wordCount: number;
//   published_at: string;
//   content: string;
// }

export default function ChapterDetail() {
  // const router = useRouter();
  // const { toast } = useToast();
  const { chapterId, storyId } = useParams();
  const navigate = useNavigate();
  // const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data, isLoading: isLoadingChapter } = useQuery({
    queryFn: () => getChapterById(chapterId!),
    queryKey: ["chapter"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteChapter,
  });

  const chapterData = data?.data?.data;

  const handleDeleteChapter = async () => {
    mutate(chapterId!, {
      onSuccess: () => {
        toast.success("Xóa chương thành công", {
          onClose() {
            navigate(`/admin/stories/${storyId}`);
          },
        });
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi xóa chương");
      },
    });
  };

  if (isLoadingChapter || !chapterData) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <PageHeader
        title={chapterData.title}
        description={`Chapter ${chapterData.order} of ${chapterData.storyTitle}`}
        breadcrumbs={[
          { label: "Stories", href: "/stories" },
          {
            label: chapterData.storyTitle,
            href: `/stories/${chapterData.storyId}`,
          },
          {
            label: "Chapters",
            href: `/stories/${chapterData.storyId}/chapters`,
          },
          { label: chapterData.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/stories/${chapterData.storyId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/stories/${chapterData.storyId}/chapters/${chapterData.id}/edit`}
              >
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
                  <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{chapterData.title}"? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteChapter}
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
              <AlertDialogTitle>Xóa chương</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn chắc chắn muốn xóa chương "{chapterData.title}"? Hành động
                này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteChapter}
                disabled={isPending}
              >
                {isPending ? "Đang xóa..." : "Xóa"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="settings">Thông tin phụ</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{chapterData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <Textarea
                  disabled
                  value={chapterData.content || "Chưa có nội dung"}
                  className="min-h-[400px] resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chương</CardTitle>
              <CardDescription>
                Quản lý metadata và tùy chọn xuất bản chương
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Trạng thái</h3>
                  <p className="text-sm capitalize">
                    {chapterData.status === "PUBLISHED"
                      ? "Đã xuất bản"
                      : "Bản nháp"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Số từ</h3>
                  <p className="text-sm">
                    {chapterData.content
                      ? chapterData.content.split(" ").length
                      : 0}{" "}
                    từ
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Thứ tự chương</h3>
                  <p className="text-sm">{chapterData.chapter_number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Ngày xuất bản</h3>
                  <p className="text-sm">
                    {chapterData.published_at
                      ? formatDate(chapterData.published_at)
                      : "Chưa xuất bản"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
