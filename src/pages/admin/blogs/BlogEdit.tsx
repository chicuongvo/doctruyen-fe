import { updateBlog as updateBlogById, getBlogById } from "@/api/blogs.api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function EditBlogPage() {
  const { blogId } = useParams();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryFn: () => getBlogById(blogId!),
    queryKey: ["blog", blogId],
  });

  const blog = data?.data?.data;

  async function updateBlog(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;

    try {
      setIsPending(true);
      await toast.promise(
        updateBlogById(blogId!, { title, content, cover_image }),
        {
          pending: "Đang lưu blog...",
        }
      );
      toast.success("Lưu blog thành công", {
        onClose() {
          navigate(`/admin/blogs`);
        },
      });
      // redirect(`/blogs/${params.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lưu blog thất bại");
    } finally {
      setIsPending(false);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateBlog(formData);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                required
                defaultValue={blog?.title}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image">Link ảnh bìa</Label>
              <Input
                id="cover_image"
                name="cover_image"
                placeholder="Enter cover image URL"
                defaultValue={blog?.cover_image}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                rows={12}
                required
                defaultValue={blog?.content}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/admin/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Hủy
              </Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Đang lưu..." : "Lưu blog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
