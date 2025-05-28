"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { getChapterById, updateChapter } from "@/api/stories.api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

interface ChapterData {
  chapter_id: string;
  title: string;
  chapter_number: number;
  content: string;
  status: string;
  story_id: string;
  published_at?: string;
  created_at?: string;
}

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

export default function ChapterEdit() {
  const navigate = useNavigate();
  const { chapterId, storyId } = useParams();

  const { data, isLoading: isLoadingChapter } = useQuery({
    queryFn: () => getChapterById(chapterId!),
    queryKey: ["chapter"],
  });

  const { mutate: updateChapterMutation, isPending } = useMutation({
    mutationFn: (updateData: any) => updateChapter(chapterId!, updateData),
    onSuccess: () => {
      toast.success("Cập nhật chương thành công", {
        onClose() {
          navigate(`/admin/stories/${storyId}/chapters/${chapterId}`);
        },
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật chương");
    },
  });

  const chapterData = data?.data?.data as ChapterData;
  const [formData, setFormData] = useState({
    title: "",
    chapter_number: 1,
    content: "",
    status: "PUBLISHED",
  });

  useEffect(() => {
    if (!data) return;
    setFormData({
      title: chapterData.title,
      chapter_number: chapterData.chapter_number,
      content: chapterData.content,
      status: chapterData.status,
    });
  }, [chapterData]);

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
    setFormData(prev => ({ ...prev, [id]: parseInt(value) || 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      title: formData.title,
      content: formData.content,
      status: formData.status,
    };

    updateChapterMutation(updateData);
  };

  if (isLoadingChapter || !chapterData) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề chương</Label>
              <Input
                id="title"
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
                value={formData.content}
                onChange={handleInputChange}
                rows={15}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link
                to={`/admin/stories/${chapterData.story_id}/chapters/${chapterData.chapter_id}`}
              >
                Hủy
              </Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
