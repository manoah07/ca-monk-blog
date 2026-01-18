import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateBlogInput } from "../types/blog";
import { createBlog, getBlogById, getBlogs } from "../api/blog";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
}

export function useBlog(id: number | null) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogInput) => createBlog(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
