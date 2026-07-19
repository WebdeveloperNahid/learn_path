// src/Components/home/FeaturedCourses.tsx
import { getLatestCourses } from "@/lib/api/get-course";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import CourseCard from "./CourseCard";


export default async function FeaturedCourses() {
  const courses = await getLatestCourses();

  if (!courses || courses.length === 0) return null;

  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
              FEATURED COURSES
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Explore our latest tours
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Freshly published, hand-picked by our instructors
            </p>
          </div>

          <Link
            href="/all-course"
            className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-violet-600"
          >
            View all courses
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}