import { Button } from "@/components/ui/button";
// import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStoryById, getChapterById, deleteChapter } from "@/api/stories.api";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ChapterData {
  chapter_id: string;
  story_id: string;
  storyTitle: string;
  title: string;
  chapter_number: number;
  status: string;
  wordCount: number;
  published_at: string;
  content: string;
}

export default function ChapterDetail() {
  // const router = useRouter();
  // const { toast } = useToast();
  const { chapterId, storyId } = useParams();
  const navigate = useNavigate();
  // const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data, isLoading: isLoadingChapter } = useQuery({
    queryFn: () => getChapterById(chapterId!),
    queryKey: ["chapter"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteChapter,
  });

  const chapterData = data?.data?.data;

  const handleDeleteChapter = async () => {
    mutate(chapterId!, {
      onSuccess: () => navigate(`/admin/stories/${storyId}`),
    });
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
      {/* <PageHeader
        title={chapterData.title}
        description={`Chapter ${chapterData.order} of ${chapterData.storyTitle}`}
        breadcrumbs={[
          { label: "Stories", href: "/stories" },
          {
            label: chapterData.storyTitle,
            href: `/stories/${chapterData.storyId}`,
          },
          {
            label: "Chapters",
            href: `/stories/${chapterData.storyId}/chapters`,
          },
          { label: chapterData.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/stories/${chapterData.storyId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/stories/${chapterData.storyId}/chapters/${chapterData.id}/edit`}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <AlertDialog
              open={openDeleteDialog}
              onOpenChange={setOpenDeleteDialog}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{chapterData.title}"? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteChapter}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      /> */}
      <div className="self-end">
        <Button variant="outline" asChild className="mr-3">
          <Link to={`edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Story</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{chapterData.title}"? This
                action cannot be undone and will permanently delete the story
                and all its chapters.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteChapter}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{chapterData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                {chapterData.content
                  ?.split("\n\n")
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Settings</CardTitle>
              <CardDescription>
                Manage chapter metadata and publishing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <p className="text-sm capitalize">{chapterData.status}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Word Count</h3>
                  <p className="text-sm">
                    {chapterData.content.split(" ").length} words
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Chapter Order</h3>
                  <p className="text-sm">{chapterData.chapter_number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Published Date</h3>
                  <p className="text-sm">
                    {chapterData.published_at || "Not published"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
