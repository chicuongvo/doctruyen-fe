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
import { Link } from "react-router-dom";
import { createStory, getGenres } from "@/api/stories.api";
import { useQuery } from "@tanstack/react-query";
// import { useToast } from "@/components/ui/use-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading: isLoadingGenres } = useQuery({
    queryFn: getGenres,
    queryKey: ["genres"],
  });
  const genres = data?.data.data;

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
    setIsSubmitting(true);
    const storyData = {
      title: formData.title,
      description: formData.synopsis,
      cover_image: formData.coverImage,
      status: formData.status,
      genres: formData.genres,
      author_name: formData.author,
    };

    console.log(JSON.stringify(storyData));

    try {
      const { data } = await createStory(JSON.stringify(storyData));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => {
      const genres = prev.genres.includes(value)
        ? prev.genres.filter((g) => g !== value)
        : [...prev.genres, value];
      return { ...prev, genres };
    });
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <PageHeader
        title="Create New Story"
        description="Create a new story for your readers"
        breadcrumbs={[
          { label: "Stories", href: "/stories" },
          { label: "New Story" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/stories">
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter story title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Enter story author"
                required
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  onValueChange={handleGenreChange}
                  value={formData.genres[0]}
                >
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
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
                    {formData.genres.map((genreName) => {
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
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={handleStatusChange}
                  value={formData.status}
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
              <Label htmlFor="synopsis">Synopsis</Label>
              <Textarea
                id="synopsis"
                placeholder="Brief summary of your story"
                rows={5}
                required
                value={formData.synopsis}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
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
              <Link to="/admin/stories">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Story"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
