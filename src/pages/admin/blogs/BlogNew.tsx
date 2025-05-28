import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createBlog } from "@/api/blogs.api";

export default function BlogNew() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;

    try {
      await toast.promise(() => createBlog({ title, content, cover_image }), {
        pending: "Đang tạo blog...",
      });
      toast.success("Tạo blog thành công", {
        onClose() {
          navigate(`/admin/blogs`);
        },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Tạo blog thất bại");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image">Link ảnh bìa</Label>
              <Input
                id="cover_image"
                name="cover_image"
                placeholder="Enter cover image URL"
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild disabled={isLoading}>
              <Link to="/admin/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Hủy
              </Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Đang tạo..." : "Tạo blog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
