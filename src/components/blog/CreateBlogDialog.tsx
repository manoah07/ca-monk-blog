import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import type { CreateBlogInput } from "../../types/blog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function splitCategories(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function CreateBlogDialog({ onCreated }: { onCreated?: () => void }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: CreateBlogInput = {
      title: title.trim(),
      category: splitCategories(category),
      description: description.trim(),
      date: new Date().toISOString(),
      coverImage: coverImage.trim(),
      content: content.trim(),
    };

    if (!payload.title || !payload.description || !payload.content) return;

    await mutateAsync(payload);
    setOpen(false);

    setTitle("");
    setCategory("");
    setDescription("");
    setCoverImage("");
    setContent("");

    onCreated?.();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg text-sm">Create Blog</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Categories (comma separated)</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="FINANCE, TECH"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Cover Image URL</label>
            <Input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.pexels.com/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Write your blog content here..."
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !title.trim() || !description.trim() || !content.trim()}
            className="w-full rounded-lg"
          >
            {isPending ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
