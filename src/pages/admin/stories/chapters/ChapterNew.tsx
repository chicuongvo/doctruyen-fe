import type React from "react";
import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { createChapter } from "@/api/stories.api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

export default function ChapterNew() {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    chapter_number: 1,
    content: "",
    status: "DRAFT",
    story_id: storyId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createChapter,
    onSuccess: () => {
      toast.success("Tạo chương thành công", {
        onClose() {
          navigate(`/admin/stories/${storyId}`);
        },
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo chương");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const chapterData = {
      title: formData.title,
      chapter_number: formData.chapter_number,
      content: formData.content,
      status: formData.status,
      story_id: storyId,
    };

    mutate(chapterData);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <PageHeader
        title="Create New Chapter"
        description={`Add a new chapter to ${storyData.title}`}
        breadcrumbs={[
          { label: "Stories", href: "/stories" },
          { label: storyData.title, href: `/stories/${storyData.story_id}` },
          { label: "New Chapter" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/stories/${storyData.story_id}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      /> */}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề chương</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề chương"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapter_number">Số chương</Label>
                <Input
                  id="chapter_number"
                  type="number"
                  min="1"
                  value={formData.chapter_number}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Bản nháp</SelectItem>
                    <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung chương</Label>
              <Textarea
                id="content"
                placeholder="Viết nội dung chương tại đây..."
                value={formData.content}
                onChange={handleInputChange}
                rows={15}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to={`/admin/stories/${storyId}`}>Hủy</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Đang lưu..." : "Lưu chương"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
