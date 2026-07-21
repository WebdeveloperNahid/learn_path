"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineSparkles, HiOutlineArrowDown } from "react-icons/hi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

const heroSlides = [
  {
    tag: "AI-Powered Recommendations",
    title: "Learn Skills That",
    highlight: "Actually Matter",
    description:
      "LearnPath uses AI to understand your goals and match you with the perfect courses — no more guessing what to learn next.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    tag: "Learn From Real Experts",
    title: "Courses Taught By",
    highlight: "Industry Instructors",
    description:
      "Every course on LearnPath is created by instructors who work in the field — practical knowledge, not just theory.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
  {
    tag: "Your Personal AI Assistant",
    title: "Get Answers",
    highlight: "Anytime You Need",
    description:
      "Stuck on a topic? Our AI Chat Assistant understands your course context and helps you learn faster.",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-slate-50">
      {/* Background decorative gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-100 opacity-50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — Text content */}
        <div className="order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {/* Tag */}
              <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3.5 py-1.5 text-xs font-bold text-indigo-700">
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                {slide.tag}
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                {slide.title}{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {slide.highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Search bar — interactive CTA element */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50"
          >
            <HiOutlineSearch className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="w-full bg-transparent py-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg hover:shadow-indigo-300"
            >
              Search
            </button>
          </form>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/all-course"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <HiOutlineAcademicCap className="h-5 w-5" />
              Explore Courses
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-700"
            >
              Get Started Free
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["EF", "AR", "TS", "MK"].map((initials, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-violet-500 text-[11px] font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Trusted by 12,000+ learners worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right — Image + Slide dots */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl shadow-indigo-200/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide}
                src={slide.image}
                alt={slide.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>

          {/* Slide indicator dots */}
          <div className="mt-5 flex justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === activeSlide
                    ? "w-8 bg-gradient-to-r from-indigo-600 to-violet-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — visual flow to next section */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Scroll
          </span>
          <HiOutlineArrowDown className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  );
}