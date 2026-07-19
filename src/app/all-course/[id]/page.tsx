import { getCourseById } from "@/lib/api/get-course";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiClock,
  FiUsers,
  FiStar,
  FiGlobe,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiAward,
  FiBarChart2,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
// import { getCourseById } from "@/lib/actions/get-courses";

type CourseDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const hasDiscount =
    course.originalPrice && course.originalPrice > course.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((course.originalPrice! - course.price) / course.originalPrice!) * 100
      )
    : 0;

  return (
    <section className="bg-slate-50">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 to-violet-700">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-indigo-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/explore" className="hover:text-white">Explore</Link>
            <span>/</span>
            <span className="text-white">{course.category}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                <HiOutlineAcademicCap className="h-3.5 w-3.5" />
                {course.category} · {course.level}
              </span>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {course.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-indigo-100 sm:text-base">
                {course.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-indigo-100">
                <span className="flex items-center gap-1.5">
                  <FiStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {course.rating > 0 ? course.rating.toFixed(1) : "New"} rating
                </span>
                <span className="flex items-center gap-1.5">
                  <FiUsers className="h-4 w-4" />
                  {course.studentsEnrolled} students enrolled
                </span>
                <span className="flex items-center gap-1.5">
                  <FiGlobe className="h-4 w-4" />
                  {course.language}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-sm font-bold text-slate-900">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-indigo-200">Instructor</p>
                  <p className="text-sm font-bold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Gallery */}
            {course.gallery && course.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[course.image, ...course.gallery].slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className={`relative aspect-video overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 ${
                      i === 0 ? "col-span-2 sm:col-span-1" : ""
                    }`}
                  >
                    <Image
                      src={img && img.trim() !== "" ? img : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"}
                      alt={`${course.title} preview ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-lg font-extrabold text-slate-900">Course Overview</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                {course.description}
              </p>
            </div>

            {/* What you'll learn */}
            {course.learnings && course.learnings.length > 0 && (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-slate-900">What You&apos;ll Learn</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {course.learnings.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements — Key Info / Specifications */}
            {course.requirements && course.requirements.length > 0 && (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-slate-900">Requirements</h2>
                <ul className="mt-4 space-y-2.5">
                  {course.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews placeholder */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
              <h2 className="text-lg font-extrabold text-slate-900">Reviews & Ratings</h2>
              {course.studentsEnrolled > 0 ? (
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {course.rating.toFixed(1)}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(course.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-500">
                    based on {course.studentsEnrolled} students
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-sm font-medium text-slate-500">
                  No reviews yet. Be the first to enroll and share your feedback!
                </p>
              )}
            </div>
          </div>

          {/* Right column — Sticky Sidebar */}
          <div>
            <div className="sticky top-24 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg shadow-slate-200/50">
              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={course.image && course.image.trim() !== "" ? course.image : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"}
                  alt={course.title}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-indigo-700">
                    ${course.price}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm font-medium text-slate-400 line-through">
                        ${course.originalPrice}
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>

                <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg hover:shadow-indigo-300">
                  Enroll Now
                </button>

                <p className="mt-3 text-center text-[11px] font-semibold text-slate-400">
                  30-day money-back guarantee
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-600">
                      <FiBarChart2 className="h-4 w-4 text-indigo-500" />
                      Level
                    </span>
                    <span className="font-bold text-slate-900">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-600">
                      <FiClock className="h-4 w-4 text-indigo-500" />
                      Duration
                    </span>
                    <span className="font-bold text-slate-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-600">
                      <FiCalendar className="h-4 w-4 text-indigo-500" />
                      Starts
                    </span>
                    <span className="font-bold text-slate-900">{course.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-600">
                      <FiMapPin className="h-4 w-4 text-indigo-500" />
                      Mode
                    </span>
                    <span className="font-bold text-slate-900">{course.mode}</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-slate-600">
                        <FiAward className="h-4 w-4 text-amber-500" />
                        Certificate
                      </span>
                      <span className="font-bold text-emerald-600">Included</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}