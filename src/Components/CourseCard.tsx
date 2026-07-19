import Link from "next/link";
import Image from "next/image";
import { FiClock, FiUsers, FiStar } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import type { TCourse } from "@/types/cours";

type CourseCardProps = {
  course: TCourse;
};

export default function CourseCard({ course }: CourseCardProps) {
  const hasDiscount =
    course.originalPrice && course.originalPrice > course.price;

  return (
    <Link
      href={`/all-course/${course._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-indigo-700 shadow">
          {course.category}
        </span>
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow">
            {Math.round(
              ((course.originalPrice! - course.price) /
                course.originalPrice!) *
                100
            )}
            % OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900">
          {course.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
          {course.shortDescription}
        </p>

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <HiOutlineAcademicCap className="h-3.5 w-3.5" />
            {course.level}
          </span>
          <span className="flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers className="h-3.5 w-3.5" />
            {course.studentsEnrolled}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-800">
            {course.rating > 0 ? course.rating.toFixed(1) : "New"}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-base font-extrabold text-indigo-700">
              ${course.price}
            </span>
            {hasDiscount && (
              <span className="ml-1.5 text-xs font-medium text-slate-400 line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
          <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white transition group-hover:bg-indigo-600">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}