"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Save, ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGenres, getStoryById, updateStory } from "@/api/stories.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/utils/date";

interface StoryResponse {
  story_id: string;
  title: string;
  author_name: string;
  description: string;
  cover_image: string;
  price: number;
  status: string;
  progress: string;
  published_at: string;
  like_counts: number;
  rating_avg: number;
  story_genres: {
    genre: {
      genre_id: string;
      name: string;
    };
  }[];
  story_comments: any[];
  story_chapters: any[];
}

export default function StoryEdit() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const params = useParams();
  const storyId = params.storyId!;
  const [formData, setFormData] = useState({
    title: "",
    author_name: "",
    description: "",
    cover_image: "",
    price: 0,
    status: "PUBLISHED",
    progress: "ON_GOING",
    genres: [] as string[],
  });
  // const [loading, setLoading] = useState(true);

  const { data, isLoading } = useQuery({
    queryFn: () => getStoryById(storyId),
    queryKey: ["story"],
  });
  const { data: genreData, isLoading: isLoadingGenres } = useQuery({
    queryFn: getGenres,
    queryKey: ["genres"],
  });

  const { mutate: updateStoryMutation, isPending } = useMutation({
    mutationFn: (updateData: any) => updateStory(storyId, updateData),
    onSuccess: () => {
      toast.success("Cập nhật truyện thành công", {
        onClose() {
          navigate(`/admin/stories/${storyId}`);
        },
      });
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật truyện");
    },
  });

  const genres = genreData?.data.data ?? [];
  const storyData: StoryResponse = data?.data?.data;

  useEffect(() => {
    if (!storyData) return;
    setFormData({
      title: storyData.title,
      author_name: storyData.author_name,
      description: storyData.description,
      cover_image: storyData.cover_image || "",
      price: storyData.price || 0,
      status: storyData.status || "PUBLISHED",
      progress: storyData.progress || "ON_GOING",
      genres: storyData.story_genres.map(({ genre }) => genre.name),
    });
  }, [storyData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    // console.log("Value", value);
    if (!value) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenreChange = (value: string) => {
    setFormData(prev => {
      const genres = prev.genres.includes(value)
        ? prev.genres.filter(g => g !== value)
        : [...prev.genres, value];
      return { ...prev, genres };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      title: formData.title,
      author_name: formData.author_name,
      description: formData.description,
      cover_image: formData.cover_image,
      price: formData.price,
      status: formData.status,
      progress: formData.progress,
      genres: formData.genres,
    };

    updateStoryMutation(updateData);
  };

  if (isLoading || !storyData) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="content">Nội dung</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="publishing">Xuất bản</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author_name">Tác giả</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Giá</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">URL ảnh bìa</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cover_image"
                      value={formData.cover_image}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Duyệt
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="space-y-2">
                    <Label>Xem trước ảnh bìa</Label>
                    <div className="aspect-[2/3] relative overflow-hidden rounded-md border">
                      <img
                        src={formData.cover_image || "/placeholder.svg"}
                        alt={`Ảnh bìa cho ${formData.title}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select
                        value={formData.status}
                        onValueChange={value =>
                          handleSelectChange("status", value)
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Bản nháp</SelectItem>
                          <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
                          <SelectItem value="ARCHIVED">Lưu trữ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2">
                      <Label htmlFor="progress">Tiến độ</Label>
                      <Select
                        value={formData.progress}
                        onValueChange={value =>
                          handleSelectChange("progress", value)
                        }
                      >
                        <SelectTrigger id="progress">
                          <SelectValue placeholder="Chọn tiến độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ON_GOING">
                            Đang cập nhật
                          </SelectItem>
                          <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
                          <SelectItem value="HIATUS">Tạm ngưng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Mô tả hấp dẫn giúp độc giả hiểu được nội dung truyện của
                    bạn.
                  </p>
                </div>

                {/* Additional content fields can be added here as needed */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-0">
                {/* You could add more metadata fields here */}
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
                      {isLoadingGenres
                        ? []
                        : genres.map((genre: any) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publishing" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publishStatus">Trạng thái xuất bản</Label>
                    <Select
                      value={formData.status}
                      onValueChange={value =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="publishStatus">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Bản nháp</SelectItem>
                        <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
                        <SelectItem value="ARCHIVED">Lưu trữ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày xuất bản</Label>
                    <p className="text-sm pt-2">
                      {storyData.published_at
                        ? formatDate(storyData.published_at)
                        : "Chưa xuất bản"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ngày xuất bản sẽ được tự động thiết lập khi xuất bản
                    </p>
                  </div>
                </div>

                {/* Additional publishing options can be added here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" asChild>
            <Link to={`/admin/stories/${storyData.story_id}`}>Hủy</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            <Save className="mr-2 h-4 w-4" />
            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </div>
  );
}
