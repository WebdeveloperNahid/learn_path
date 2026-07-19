

import CourseCard from "@/Components/CourseCard";
import CourseFilters from "@/Components/CourseFilters";
import Pagination from "@/Components/Pagination";
import { getAllCourses } from "@/lib/api/get-course";

type ExplorePageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    level?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function AllCoursePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;

  const { courses, total, page, totalPages } = await getAllCourses({
    search: params.search,
    category: params.category,
    level: params.level,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    sort: params.sort,
    page: params.page,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Explore Courses
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-600">
          {total} course{total !== 1 ? "s" : ""} available to help you grow your skills
        </p>
      </div>

      {/* Filters */}
      <CourseFilters/>

      {/* Course grid */}
      {courses.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-slate-500">
            No courses found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}