"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { PageHeader } from "@/components/page-header";
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
import { ArrowLeft, Save, ImageIcon } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGenres, getStoryById, updateStory } from "@/api/stories.api";
import { useQuery } from "@tanstack/react-query";

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
  // const { toast } = useToast();
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
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

      console.log(updateData);

      await updateStory(storyId, updateData);

      // Redirect back to story page
      // router.push(`/stories/${storyId}`);
    } catch (error) {
      console.error("Error updating story:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !storyData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading story data...
      </div>
    );
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
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="publishing">Publishing</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author_name">Author</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">Cover Image URL</Label>
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
                      Browse
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="space-y-2">
                    <Label>Cover Preview</Label>
                    <div className="aspect-[2/3] relative overflow-hidden rounded-md border">
                      <img
                        src={formData.cover_image || "/placeholder.svg"}
                        alt={`Cover for ${formData.title}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={value =>
                          handleSelectChange("status", value)
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2">
                      <Label htmlFor="progress">Progress</Label>
                      <Select
                        value={formData.progress}
                        onValueChange={value =>
                          handleSelectChange("progress", value)
                        }
                      >
                        <SelectTrigger id="progress">
                          <SelectValue placeholder="Select progress" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ON_GOING">On Going</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="HIATUS">Hiatus</SelectItem>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    A compelling description helps readers understand what your
                    story is about.
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
                        : genres.map(genre => (
                            <SelectItem key={genre.genre_id} value={genre.name}>
                              {genre.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  {formData.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.genres.map(genreName => {
                        const genre = genres.find(g => g.name === genreName);
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
                    <Label htmlFor="publishStatus">Publication Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={value =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="publishStatus">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Publication Date</Label>
                    <p className="text-sm pt-2">
                      {storyData.published_at
                        ? new Date(storyData.published_at).toLocaleDateString()
                        : "Not published"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Publication date is automatically set when publishing
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
            <Link to={`/stories/${storyData.story_id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
