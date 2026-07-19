import Link from "next/link";
import {
  FiBookOpen,
  FiUsers,
  FiTarget,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

const STATS = [
  { label: "Active Courses", value: "500+" },
  { label: "Instructors", value: "150+" },
  { label: "Students Enrolled", value: "10K+" },
  { label: "Categories", value: "20+" },
];

const VALUES = [
  {
    icon: FiTarget,
    title: "Our Mission",
    description:
      "To make quality education accessible to everyone, everywhere — connecting passionate instructors with eager learners.",
  },
  {
    icon: FiUsers,
    title: "Built for Everyone",
    description:
      "Whether you want to learn a new skill or share your expertise, LearnPath gives you the tools to do it simply.",
  },
  {
    icon: FiAward,
    title: "Quality First",
    description:
      "Every course is reviewed and rated by real students, so you always know what you're signing up for.",
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiBookOpen className="h-3.5 w-3.5" />
          ABOUT LEARNPATH
        </span>
        <h1 className="mt-5 text-4xl font-bold text-slate-900 sm:text-5xl">
          Learning, made accessible
        </h1>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        <p className="mt-5 text-lg text-slate-500">
          LearnPath connects instructors and students on one simple platform —
          publish a course, find a course, and start learning at your own
          pace.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
          >
            <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-black text-transparent">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-slate-200 border-t-4 border-t-indigo-600 bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <value.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-bold text-slate-900">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-slate-200 border-t-4 border-t-indigo-600 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Ready to start learning?
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Browse hundreds of courses or publish your own today.
        </p>
        <Link
          href="/all-course"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-300"
        >
          Browse Courses
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}