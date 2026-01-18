export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  date: string;
  coverImage?: string;
}

export type CreateBlogInput = Omit<Blog, "id">;