"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Person,
  Envelope,
  ArrowUpRight,
  BookOpen,
  House,
} from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import { getAllCourses } from "@/lib/api/get-course";
import RecommendedForYou from "@/Components/RecommendedForYou";

type Course = {
  _id: string;
  title: string;
  instructor: string;
  category: string;
  level: string;
  price: number;
  rating: number;
  image: string;
};

const StudentPage = () => {
  const { data: session } = useSession();
  const [recommended, setRecommended] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { courses } = await getAllCourses({ sort: "rating", page: "1" });
      setRecommended(courses.slice(0, 4));
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-6 py-8 sm:px-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Student Dashboard
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {session?.user?.name || "Learner"} 👋
          </h1>
          <Link
            href="/all-course"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:shadow-md"
          >
            <House className="size-4" />
            Explore Courses
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          Continue your learning journey — here&apos;s what&apos;s new for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recommended courses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recommended For You</h2>
            <Link
              href="/all-course"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-violet-600"
            >
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : recommended.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-sm text-slate-400">
              <p>No courses available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recommended.map((course) => (
                <Link
                  key={course._id}
                  href={`/all-course/${course._id}`}
                  className="flex gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                >
                  <img
                    src={course.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80"}
                    alt={course.title}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">{course.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{course.instructor}</p>
                    <p className="mt-1 text-xs font-semibold text-indigo-600">${course.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions + profile snapshot */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-900">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/all-course"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <BookOpen className="size-4" />
                Browse all courses
              </Link>
              <Link
                href="/dashboard/user/profile"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Person className="size-4" />
                My profile
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Envelope className="size-4" />
                Contact support
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-sm">
            <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-white/15">
              <BookOpen className="size-5" />
            </div>
            <p className="text-sm font-semibold text-indigo-100">Keep Learning</p>
            <p className="mt-1 text-lg font-bold">Start your first course today</p>
            <p className="mt-2 text-xs text-indigo-100">
              Explore our catalog and find a course that matches your goals.
            </p>
          </div>
        </div>
      </div>

      <RecommendedForYou />

    </div>

    
  );
};

export default StudentPage;