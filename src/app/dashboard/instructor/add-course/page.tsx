"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiBookOpen,
  FiUser,
  FiGlobe,
  FiBarChart2,
  FiDollarSign,
  FiClock,
  FiAward,
  FiImage,
  FiCheckCircle,
  FiList,
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { createAddCours } from "@/lib/actions/add-cours";
import { generateCourseDescription } from "@/lib/actions/ai";
import { HiSparkles } from "react-icons/hi2";

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Business",
  "Marketing",
  "Photography",
] as const;

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const MODES = ["Online", "Offline", "Hybrid"] as const;

type CourseFormState = {
  title: string;
  category: string;
  level: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice: string;
  duration: string;
  totalLectures: string;
  certificate: "yes" | "no";
  startDate: string;
  mode: string;
  location: string;
  image: string;
  shortDescription: string;
  description: string;
};

const initialForm: CourseFormState = {
  title: "",
  category: "Web Development",
  level: "Beginner",
  instructor: "",
  language: "English",
  price: "",
  originalPrice: "",
  duration: "",
  totalLectures: "",
  certificate: "yes",
  startDate: "",
  mode: "Online",
  location: "",
  image: "",
  shortDescription: "",
  description: "",
};

export default function AddCoursePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState<CourseFormState>(initialForm);
  const [gallery, setGallery] = useState<string[]>([""]);
  const [learnings, setLearnings] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState <
  "short" | "medium" | "long"
>("medium");

const handleChange = (field: keyof CourseFormState, value: string) => {
  setForm((prev) => ({ ...prev, [field]: value }));
};

  const updateListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList([...list, ""]);
  };

  const removeListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleGenerateDescription = async () => {
    if (!form.title || !form.category) {
      toast.error("Please enter a course title and category first");
      return;
    }

    setAiGenerating(true);
    try {
      const result = await generateCourseDescription({
        title: form.title,
        category: form.category,
        level: form.level,
        length: descriptionLength,
      });

      if (result?.description) {
        const sentences = result.description.split(". ");
        const shortDesc =
          sentences[0] + (sentences[0].endsWith(".") ? "" : ".");

        setForm((prev) => ({
          ...prev,
          description: result.description,
          shortDescription:
            shortDesc.length > 150 ? shortDesc.slice(0, 150) : shortDesc,
        }));
        toast.success("Description generated!");
      } else {
        toast.error("Failed to generate description");
      }
    } catch {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.title ||
      !form.instructor ||
      !form.price ||
      !form.image ||
      !form.startDate
    ) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      if (!session?.user?.id) {
        toast.error("You must be logged in to create a course");
        return;
      }
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        totalLectures: form.totalLectures ? Number(form.totalLectures) : 0,
        certificate: form.certificate === "yes",
        location: form.mode === "Online" ? "Online" : form.location,
        rating: 0,
        studentsEnrolled: 0,
        createdBy: session?.user.id,
        gallery: gallery.filter((g) => g.trim() !== ""),
        learnings: learnings.filter((l) => l.trim() !== ""),
        requirements: requirements.filter((r) => r.trim() !== ""),
      };

      const result = await createAddCours(payload);

      if (result?.insertedId || result?.acknowledged) {
        setSuccess("Course published successfully! Redirecting...");
        toast.success("Course published successfully!");

        setTimeout(() => {
          router.push("/all-course");
          router.refresh();
        }, 1200);
      } else {
        setError("Something went wrong while publishing the course.");
        toast.error("Something went wrong while publishing the course.");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to publish course. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-6xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiBookOpen className="h-3.5 w-3.5" />
          INSTRUCTOR STUDIO
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Publish a New Course
        </h1>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        <p className="mt-3 text-slate-500">
          Fill in the details below to publish your course
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-slate-200 border-t-4 border-t-indigo-600 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Basic Info */}
          <div>
            <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <FiBookOpen className="h-3.5 w-3.5" />
              </span>
              Basic Information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">
                  Course Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Complete Web Development Bootcamp"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Level *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiBarChart2 className="h-4 w-4 text-slate-400" />
                  <select
                    value={form.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Instructor Name *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiUser className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Sarah Ahmed"
                    value={form.instructor}
                    onChange={(e) => handleChange("instructor", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Language
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiGlobe className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="English"
                    value={form.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Schedule */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <FiDollarSign className="h-3.5 w-3.5" />
              </span>
              Pricing & Schedule
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Price (USD) *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiDollarSign className="h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    placeholder="49"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Original Price
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiDollarSign className="h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    placeholder="99"
                    value={form.originalPrice}
                    onChange={(e) =>
                      handleChange("originalPrice", e.target.value)
                    }
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Duration *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiClock className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="8 Weeks"
                    value={form.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Total Lectures
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiList className="h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    placeholder="42"
                    value={form.totalLectures}
                    onChange={(e) =>
                      handleChange("totalLectures", e.target.value)
                    }
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-xs font-semibold text-slate-700">
                  Certificate of Completion
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiAward className="h-4 w-4 text-amber-500" />
                  <select
                    value={form.certificate}
                    onChange={(e) =>
                      handleChange(
                        "certificate",
                        e.target.value as "yes" | "no",
                      )
                    }
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  >
                    <option value="yes">Yes, certificate included</option>
                    <option value="no">No certificate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Start Date *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiCalendar className="h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Mode *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiMapPin className="h-4 w-4 text-slate-400" />
                  <select
                    value={form.mode}
                    onChange={(e) => handleChange("mode", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  >
                    {MODES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {form.mode !== "Online" && (
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Location *
                  </label>
                  <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                    <FiMapPin className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi, Dhaka"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <FiImage className="h-3.5 w-3.5" />
              </span>
              Images
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Main Thumbnail URL *
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <FiImage className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={form.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Gallery Images (optional)
                </label>
                <div className="mt-1 space-y-2">
                  {gallery.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://example.com/preview-image.jpg"
                        value={url}
                        onChange={(e) =>
                          updateListItem(
                            gallery,
                            setGallery,
                            index,
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                      {gallery.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeListItem(gallery, setGallery, index)
                          }
                          className="shrink-0 text-slate-400 hover:text-red-500"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addListItem(gallery, setGallery)}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
                  >
                    <FiPlus className="h-3.5 w-3.5" /> Add another image
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                  <FiList className="h-3.5 w-3.5" />
                </span>
                Description
              </h2>

              <div className="flex items-center gap-2">
                {/* Adjustable output length selector */}
                <select
                  value={descriptionLength}
                  onChange={(e) =>
                    setDescriptionLength(
                      e.target.value as "short" | "medium" | "long",
                    )
                  }
                  className="rounded-lg border-2 border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-400"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>

                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={aiGenerating}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
                >
                  <HiSparkles className="h-3.5 w-3.5" />
                  {aiGenerating
                    ? "Generating..."
                    : form.description
                    ? "Regenerate"
                    : "Generate with AI"}
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  placeholder="A brief one-liner shown on the course card"
                  value={form.shortDescription}
                  onChange={(e) =>
                    handleChange("shortDescription", e.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Full Description *
                </label>
                <textarea
                  rows={5}
                  placeholder="Detailed overview of what this course covers"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* What You'll Learn / Requirements */}
          <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                </span>
                What You&apos;ll Learn
              </h2>
              <div className="mt-3 space-y-2">
                {learnings.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Build responsive websites from scratch"
                      value={item}
                      onChange={(e) =>
                        updateListItem(
                          learnings,
                          setLearnings,
                          index,
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    {learnings.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(learnings, setLearnings, index)
                        }
                        className="shrink-0 text-slate-400 hover:text-red-500"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(learnings, setLearnings)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
                >
                  <FiPlus className="h-3.5 w-3.5" /> Add item
                </button>
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FiList className="h-3.5 w-3.5" />
                </span>
                Requirements
              </h2>
              <div className="mt-3 space-y-2">
                {requirements.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. A laptop with internet access"
                      value={item}
                      onChange={(e) =>
                        updateListItem(
                          requirements,
                          setRequirements,
                          index,
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    {requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(requirements, setRequirements, index)
                        }
                        className="shrink-0 text-slate-400 hover:text-red-500"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(requirements, setRequirements)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
                >
                  <FiPlus className="h-3.5 w-3.5" /> Add item
                </button>
              </div>
            </div>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-600">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-300 disabled:opacity-60"
          >
            <FiBookOpen className="h-4 w-4" />
            {isLoading ? "Publishing Course..." : "Publish Course"}
          </button>
        </form>
      </div>
    </section>
  );
}