import client from "./client";
import type { Blog, CreateBlogInput } from "../types/blog";

export async function getBlogs(): Promise<Blog[]> {
  const { data } = await client.get<Blog[]>("/blogs");
  return data;
}

export async function getBlogById(id: number): Promise<Blog> {
  const { data } = await client.get<Blog>(`/blogs/${id}`);
  return data;
}

export async function createBlog(payload: CreateBlogInput): Promise<Blog> {
  const { data } = await client.post<Blog>("/blogs", payload);
  return data;
}
