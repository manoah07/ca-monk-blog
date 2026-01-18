import { useMemo, useState } from "react";
import { useBlogs } from "./hooks/useBlogs";

import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import CreateBlogDialog from "./components/blog/CreateBlogDialog";

import { Skeleton } from "./components/ui/skeleton";
import { Button } from "./components/ui/button";

export default function App() {
  const { data, isLoading, isError } = useBlogs();
  const blogs = data ?? [];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = useMemo(() => {
    return selectedId ?? blogs[0]?.id ?? null;
  }, [selectedId, blogs]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-base">CM</span>
            </div>
            <span className="font-bold text-xl tracking-tight">CA MONK</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a className="hover:text-slate-900 transition-colors" href="#">
              Tools
            </a>
            <a className="hover:text-slate-900 transition-colors" href="#">
              Practice
            </a>
            <a className="hover:text-slate-900 transition-colors" href="#">
              Events
            </a>
            <a className="hover:text-slate-900 transition-colors" href="#">
              Job Board
            </a>
            <a className="hover:text-slate-900 transition-colors" href="#">
              Points
            </a>
          </nav>

          <Button className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 font-semibold">
            Profile
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
            CA Monk Blog
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-10">
        {isError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Failed to load blogs. Make sure JSON Server is running at{" "}
            <span className="font-semibold">http://localhost:3001</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Panel */}
          <aside className="lg:col-span-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Latest Articles
              </h2>
              <CreateBlogDialog onCreated={() => setSelectedId(null)} />
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-36 w-full rounded-xl" />
                <Skeleton className="h-36 w-full rounded-xl" />
                <Skeleton className="h-36 w-full rounded-xl" />
              </div>
            ) : (
              <BlogList
                blogs={blogs}
                selectedId={activeId}
                onSelect={setSelectedId}
              />
            )}
          </aside>

          {/* Right Panel */}
          <section className="lg:col-span-8">
            <BlogDetail id={activeId} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-base">CM</span>
                </div>
                <span className="font-bold text-xl">CA MONK</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                Connect
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

