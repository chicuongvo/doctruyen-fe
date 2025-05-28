"use client";

import type React from "react";

import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { createStory, getGenres } from "@/api/stories.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

// interface Genre {
//   genre_id: string;
//   name: string;
// }

interface StoryFormData {
  title: string;
  genres: string[];
  status: string;
  synopsis: string;
  coverImage: string;
  tags: string;
  author: string;
}

export default function StoryNew() {
  const navigate = useNavigate();
  const { data, isLoading: isLoadingGenres } = useQuery({
    queryFn: getGenres,
    queryKey: ["genres"],
  });
  const genres = data?.data.data;

  const { mutate: createStoryMutation, isPending } = useMutation({
    mutationFn: createStory,
    onSuccess: data => {
      toast.success("Tạo truyện thành công", {
        onClose() {
          navigate(`/admin/stories/${data.data.data.story_id}`);
        },
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo truyện");
    },
  });

  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    genres: [],
    status: "PUBLISHED",
    synopsis: "",
    coverImage: "",
    tags: "",
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storyData = {
      title: formData.title,
      description: formData.synopsis,
      cover_image: formData.coverImage,
      status: formData.status,
      genres: formData.genres,
      author_name: formData.author,
    };

    createStoryMutation(JSON.stringify(storyData));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenreChange = (value: string) => {
    setFormData(prev => {
      const genres = prev.genres.includes(value)
        ? prev.genres.filter(g => g !== value)
        : [...prev.genres, value];
      return { ...prev, genres };
    });
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  if (isLoadingGenres) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề truyện"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Tác giả</Label>
              <Input
                id="author"
                placeholder="Nhập tên tác giả"
                required
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Thể loại</Label>
                <Select
                  onValueChange={handleGenreChange}
                  value={formData.genres[0]}
                >
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Chọn thể loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres?.map((genre: any) => (
                      <SelectItem key={genre.genre_id} value={genre.name}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.genres.map(genreName => {
                      const genre = genres.find(
                        (g: any) => g.name === genreName
                      );
                      return (
                        <div
                          key={genreName}
                          className="bg-secondary px-2 py-1 rounded-md text-sm flex items-center gap-1"
                        >
                          {genre?.name}
                          <button
                            type="button"
                            onClick={() => handleGenreChange(genreName)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  onValueChange={handleStatusChange}
                  value={formData.status}
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
              <Label htmlFor="synopsis">Mô tả</Label>
              <Textarea
                id="synopsis"
                placeholder="Tóm tắt ngắn gọn về truyện của bạn"
                rows={5}
                required
                value={formData.synopsis}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">URL ảnh bìa</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/admin/stories">Hủy</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Đang lưu..." : "Lưu truyện"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
