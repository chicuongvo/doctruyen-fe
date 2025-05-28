import { deleteBlog, getBlogById } from "@/api/blogs.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/date";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function BlogDetail() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogById(blogId!),
    queryKey: ["blog", blogId],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBlog,
  });

  const handleDeleteBlog = async () => {
    mutate(blogId!, {
      onSuccess: () => {
        toast.success("Xóa blog thành công", {
          onClose() {
            navigate(`/admin/blogs`);
          },
        });
      },
    });
  };

  const blog = data?.data?.data;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
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
                Bạn chắc chắn muốn xóa blog "{blog.title}"?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteBlog}
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
            <CardContent>
              <div className="aspect-[2/3] w-[50%] relative overflow-hidden rounded-md">
                <img
                  src={blog.cover_image || "/placeholder.svg"}
                  alt={`Cover for ${blog.title}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <Textarea disabled value={blog.content} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Tác giả</h3>
                  <p className="text-sm">{blog.author.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Ngày tạo</h3>
                  <p className="text-sm">{formatDate(blog.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
