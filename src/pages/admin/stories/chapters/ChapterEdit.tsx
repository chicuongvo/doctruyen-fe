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
import { ArrowLeft, Save } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { getStoryById, getChapterById, updateChapter } from "@/api/stories.api";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

interface StoryResponse {
  success: boolean;
  data: {
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
  };
}

export default function ChapterEdit() {
  // const { toast } = useToast();
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storyData, setStoryData] = useState<StoryResponse["data"] | null>(
    null
  );
  const { chapterId, storyId } = useParams();

  const { data, isLoading: isLoadingChapter } = useQuery({
    queryFn: () => getChapterById(chapterId!),
    queryKey: ["chapter"],
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
    setIsSubmitting(true);

    try {
      const updateData = {
        title: formData.title,
        content: formData.content,
        status: formData.status,
      };

      console.log(updateData);
      await updateChapter(chapterId!, updateData);

      // toast({
      //   title: "Chapter updated",
      //   description: "Your chapter has been updated successfully.",
      //   variant: "success",
      // });

      // Navigate back to chapter page
      // router.push(`/stories/${params.id}/chapters/${params.chapterId}`);
    } catch (error) {
      console.error("Error updating chapter:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to update chapter",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingChapter || !chapterData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading chapter data...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Chapter Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapter_number">Chapter Number</Label>
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Chapter Content</Label>
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
                Cancel
              </Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
