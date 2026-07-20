"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  ListCheck,
  Calendar,
  Person,
} from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import { getMyCourses } from "@/lib/api/get-course";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Course = {
  _id: string;
  title: string;
  studentsEnrolled: number;
  rating: number;
  category: string;
};

const InstructorPage = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!session?.user?.id) return;
      const data = await getMyCourses(session.user.id);
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, [session?.user?.id]);

  const totalCourses = courses.length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.studentsEnrolled || 0), 0);
  const avgRating =
    courses.length > 0
      ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1)
      : "0.0";

  const stats = [
    { label: "Total Courses", value: totalCourses.toString(), accent: "ocean" },
    { label: "Total Students", value: totalStudents.toString(), accent: "amber" },
    { label: "Avg. Rating", value: avgRating, accent: "emerald" },
    { label: "Categories", value: new Set(courses.map((c) => c.category)).size.toString(), accent: "violet" },
  ];

  const accentStyles: Record<string, string> = {
    ocean: "bg-indigo-50 text-indigo-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    violet: "bg-violet-50 text-violet-700",
  };

  const chartData = courses.map((c) => ({
    name: c.title.length > 14 ? c.title.slice(0, 14) + "..." : c.title,
    students: c.studentsEnrolled || 0,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-6 py-8 sm:px-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Instructor Dashboard
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {session?.user?.name || "Instructor"} 👋
          </h1>
          <Link
            href="/dashboard/instructor/add-course"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:shadow-md"
          >
            <Plus className="size-4" />
            Add New Course
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${accentStyles[stat.accent]}`}>
                Live
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart — students per course */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Students per Course</h2>
            <Link
              href="/dashboard/instructor/manage-course"
              className="text-sm font-semibold text-indigo-600 hover:text-violet-600"
            >
              Manage courses
            </Link>
          </div>

          {loading ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">
              Loading chart...
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-sm text-slate-400">
              <p>No courses yet.</p>
              <Link href="/dashboard/instructor/add-course" className="font-semibold text-indigo-600">
                Publish your first course
              </Link>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
                <YAxis fontSize={11} stroke="#64748b" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Quick actions + profile snapshot */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-900">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard/instructor/add-course"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Plus className="size-4" />
                Add a new course
              </Link>
              <Link
                href="/dashboard/instructor/manage-course"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <ListCheck className="size-4" />
                Manage courses
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-sm">
            <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-white/15">
              <Person className="size-5" />
            </div>
            <p className="text-sm font-semibold text-indigo-100">Instructor Status</p>
            <p className="mt-1 text-2xl font-bold">
              {totalCourses > 0 ? "Active" : "Getting Started"}
            </p>
            <p className="mt-2 text-xs text-indigo-100">
              {totalCourses > 0
                ? `Managing ${totalCourses} course${totalCourses !== 1 ? "s" : ""} with ${totalStudents} total students.`
                : "Publish your first course to start teaching."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;