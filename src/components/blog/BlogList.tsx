import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

import type { Blog } from "../../types/blog";

function timeAgo(dateIso: string) {
  const d = new Date(dateIso).getTime();
  const diff = Date.now() - d;

  const mins = Math.floor(diff / (1000 * 60));
  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (mins < 60) return `${Math.max(1, mins)} mins ago`;
  if (hrs < 24) return `${hrs} hours ago`;
  return `${days} days ago`;
}

export default function BlogList({
  blogs,
  selectedId,
  onSelect,
}: {
  blogs: Blog[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {blogs.map((b) => {
        const active = b.id === selectedId;
        const primaryCat = b.category?.[0] ?? "GENERAL";

        return (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className="w-full text-left group"
          >
            <Card
              className={[
                "rounded-xl border bg-white transition-all duration-200",
                active
                  ? "border-indigo-400 ring-2 ring-indigo-200 shadow-lg"
                  : "border-slate-200 hover:border-indigo-300 hover:shadow-md",
              ].join(" ")}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={[
                      "h-2 w-2 rounded-full transition-all",
                      active ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-400"
                    ].join(" ")} />
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {primaryCat}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {timeAgo(b.date)}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                  {b.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {b.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(b.category ?? []).map((c) => (
                    <Badge 
                      key={c} 
                      variant="secondary" 
                      className="rounded-full text-[10px] px-2.5 py-0.5 bg-slate-100 text-slate-700"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}