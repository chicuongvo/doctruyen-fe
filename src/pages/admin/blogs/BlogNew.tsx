"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
import { createBlog } from "@/api/blogs.api";
// import Spinner from "@/components/Spinner";
import { Link } from "react-router-dom";

// interface BlogData {
//   title: string;
//   content: string;
//   cover_image: string;
// }

export default function BlogNew() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;

    try {
      await createBlog({ title, content, cover_image });

      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Failed to create blog");
      // }

      // const data = await response.json();
      // toast.success("Blog created successfully");
      // router.push(`/blogs/${data.id}`);
    } catch (error) {
      // toast.error(
      //   error instanceof Error ? error.message : "Failed to create blog"
      // );
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_image">Cover Image URL</Label>
              <Input
                id="cover_image"
                name="cover_image"
                placeholder="Enter cover image URL"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
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
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Creating..." : "Create Blog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
