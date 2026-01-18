import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

import { useBlog } from "../../hooks/useBlogs";

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogDetail({ id }: { id: string | null }) {
  const { data, isLoading, isError } = useBlog(id ? parseInt(id, 10) : null);

  if (!id) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="p-12 text-center text-slate-600">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg">Select a blog from the left to view details.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden">
        <Skeleton className="h-96 w-full" />
        <CardContent className="p-8 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg text-slate-700 font-semibold">Failed to load blog details</p>
          <p className="mt-2 text-sm text-slate-500">
            Make sure JSON Server is running and the blog id exists.
          </p>
        </CardContent>
      </Card>
    );
  }

  const primaryCat = data.category?.[0] ?? "GENERAL";
  const readTime = estimateReadTime(data.content ?? "");
  const dateText = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Parse content into paragraphs
  const contentParagraphs = data.content.split('\n\n').filter(Boolean);

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {data.coverImage ? (
          <img
            src={data.coverImage}
            alt={data.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-9xl font-bold">
              {primaryCat.charAt(0)}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-8 lg:p-12">
        {/* Category Badge and Read Time */}
        <div className="flex items-center gap-4 text-sm">
          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide">
            {primaryCat}
          </Badge>
          <span className="text-slate-500 font-medium">{readTime}</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {data.title}
        </h1>

        {/* Action Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
          <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 shadow-lg shadow-indigo-500/30">
            <Share2 className="mr-2 h-4 w-4" />
            Share Article
          </Button>

          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3.5 text-center shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Category
              </div>
              <div className="mt-1.5 text-sm font-bold text-slate-900">
                {primaryCat}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3.5 text-center shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Read Time
              </div>
              <div className="mt-1.5 text-sm font-bold text-slate-900">
                {readTime.replace(" min read", " Mins")}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3.5 text-center shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Date
              </div>
              <div className="mt-1.5 text-sm font-bold text-slate-900">
                {dateText}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 text-xl text-slate-700 leading-relaxed font-light">
          {data.description}
        </div>

        {/* Content */}
        <div className="mt-12 space-y-6 text-slate-800">
          {contentParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Featured Quote */}
        <div className="mt-12 border-l-4 border-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-r-xl">
          <p className="text-slate-700 italic text-xl leading-relaxed">
            "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."
          </p>
        </div>

        {/* Author Card */}
        <div className="mt-16 flex items-center gap-5 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 shadow-sm">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            AM
          </div>
          <div className="flex-1">
            <div className="font-bold text-lg text-slate-900">Written by Arjun Mehta</div>
            <div className="text-sm text-slate-600 mt-0.5">Senior Financial Analyst</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full hover:bg-indigo-50 hover:border-indigo-300">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full hover:bg-indigo-50 hover:border-indigo-300">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Tags */}
        {data.category && data.category.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {data.category.map((cat) => (
              <Badge 
                key={cat} 
                variant="secondary" 
                className="rounded-full px-4 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200"
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}