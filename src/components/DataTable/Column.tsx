"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/date";

// User columns
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "banned";
  createdAt: string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <div className="font-medium capitalize">{role}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/users/${user.id}`}>View details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/users/${user.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Blog columns
export type Blog = {
  blog_id: string;
  title: string;
  author: string;
  category: string;
  status: "published" | "draft" | "archived";
  publishedAt: string;
};

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Tiêu đề",
  },
  {
    accessorKey: "author",
    header: "Tác giả",
    cell: ({ row }) => {
      const author = row.getValue("author") as { username: string };
      return <span>{author.username}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => {
      return <span>{formatDate(row.getValue("created_at"))}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`${blog.blog_id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`${blog.blog_id}/edit`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Story columns
export type Story = {
  story_id: string;
  title: string;
  author_name: string;
  story_genres: string[];
  status: "PUBLISHED" | "DRAFT";
  story_chapters: any;
  published_at: string;
};

export const storyColumns: ColumnDef<Story>[] = [
  {
    accessorKey: "title",
    header: "Tên truyện",
  },
  {
    accessorKey: "author_name",
    header: "Tác giả",
  },
  {
    accessorKey: "story_chapters",
    header: "Số chương",
    cell: ({ row }) => {
      const chapters = row.getValue("story_chapters") as any;
      return <p>{chapters.length}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "PUBLISHED" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "published_at",
    header: "Ngày phát hành",
    cell: ({ row }) => {
      return <span>{formatDate(row.getValue("published_at"))}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const story = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/admin/stories/${story.story_id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/admin/stories/${story.story_id}/edit`}>
                Chỉnh sửa
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Chapter columns
export type Chapter = {
  chapter_id: string;
  title: string;
  story_id: string;
  storyTitle: string;
  order: number;
  status: "published" | "draft";
  wordCount: number;
  publishedAt: string;
};

export const chapterColumns: ColumnDef<Chapter>[] = [
  {
    accessorKey: "title",
    header: "Tên chương",
  },
  {
    accessorKey: "content",
    header: "Số chữ",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      const wordArr = content.split(" ");
      return <span>{wordArr?.length}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "published" ? "default" : "outline"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "published_at",
    header: "Ngày đăng",
    cell: ({ row }) => {
      return <span>{formatDate(row.getValue("published_at"))}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const chapter = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`chapters/${chapter.chapter_id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`chapters/${chapter.chapter_id}/edit`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
