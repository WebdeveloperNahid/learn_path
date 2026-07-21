"use client";

import { deleteCourse, getMyCourses, updateCourse } from "@/lib/api/modify-course";
import { useSession } from "@/lib/auth-client";
import { TCourse } from "@/types/cours";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiBookOpen, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Business",
  "Marketing",
  "Photography",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const MODES = ["Online", "Offline", "Hybrid"];

export default function ManageCoursesPage() {
  const { data: session, isPending } = useSession();
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<TCourse | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<TCourse | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    let ignore = false;

    const fetchCourses = async () => {
      if (isPending) return;

      if (!userId) {
        if (!ignore) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getMyCourses(userId);
        if (!ignore) {
          setCourses(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        if (!ignore) {
          toast.error("Failed to load your courses");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, [userId, isPending]);

  const handleDeleteConfirmed = async () => {
    if (!deletingCourse || !userId) return;

    const result = await deleteCourse(deletingCourse._id, userId);

    if (result?.deletedCount) {
      setCourses((prev) => prev.filter((c) => c._id !== deletingCourse._id));
      toast.success("Course deleted successfully");
    } else {
      toast.error("Could not delete. Are you the owner of this course?");
    }

    setDeletingCourse(null);
  };

  const handleUpdate = async (data: Partial<TCourse>) => {
    if (!editingCourse || !userId) return;

    const result = await updateCourse(editingCourse._id, {
      ...data,
      userId,
    });

    if (result?.modifiedCount !== undefined) {
      setCourses((prev) =>
        prev.map((c) =>
          c._id === editingCourse._id ? { ...c, ...data } : c,
        ),
      );
      toast.success("Course updated successfully");
      setEditingCourse(null);
    } else {
      toast.error("Could not update. Are you the owner of this course?");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-white to-indigo-50/40">
        <p className="text-slate-500">Loading...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiBookOpen className="h-3.5 w-3.5" />
          INSTRUCTOR STUDIO
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          Manage Your Courses
        </h1>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          View, edit, or remove the courses you have published
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {courses.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm sm:p-10 sm:text-base">
            You have not published any courses yet.
          </div>
        )}

        <div className="grid gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                {course.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
                  />
                )}
                <div className="min-w-0">
                  <h2 className="truncate font-bold text-slate-900">
                    {course.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {course.instructor} — ${course.price}
                  </p>
                  <p className="text-xs text-slate-400">
                    {course.category} • {course.level}
                  </p>
                </div>
              </div>

              <div className="grid shrink-0 grid-cols-3 gap-1.5 sm:flex sm:gap-2">
                <Link
                  href={`/all-course/${course._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-2 py-1.5 text-[11px] font-bold text-indigo-600 transition-colors hover:bg-indigo-100 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                >
                  <FiEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  View
                </Link>
                <button
                  onClick={() => setEditingCourse(course)}
                  className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-2 py-1.5 text-[11px] font-bold text-white shadow-sm shadow-indigo-200 transition-all hover:shadow-md sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                >
                  <FiEdit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => setDeletingCourse(course)}
                  className="flex items-center justify-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] font-bold text-red-600 transition-colors hover:bg-red-100 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                >
                  <FiTrash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={handleUpdate}
        />
      )}

      {deletingCourse && (
        <ConfirmDeleteModal
          courseTitle={deletingCourse.title}
          onCancel={() => setDeletingCourse(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </section>
  );
}

function EditCourseModal({
  course,
  onClose,
  onSave,
}: {
  course: TCourse;
  onClose: () => void;
  onSave: (data: Partial<TCourse>) => void;
}) {
  const [form, setForm] = useState({
    title: course.title || "",
    category: course.category || "",
    level: course.level || "",
    instructor: course.instructor || "",
    language: course.language || "",
    price: course.price || 0,
    originalPrice: course.originalPrice ?? ("" as number | ""),
    duration: course.duration || "",
    totalLectures: course.totalLectures || 0,
    certificate: course.certificate ? "yes" : "no",
    startDate: course.startDate || "",
    mode: course.mode || "Online",
    location: course.location || "",
    image: course.image || "",
    shortDescription: course.shortDescription || "",
    description: course.description || "",
  });

  const [gallery, setGallery] = useState<string[]>(
    course.gallery?.length ? course.gallery : [""],
  );
  const [learnings, setLearnings] = useState<string[]>(
    course.learnings?.length ? course.learnings : [""],
  );
  const [requirements, setRequirements] = useState<string[]>(
    course.requirements?.length ? course.requirements : [""],
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof typeof form, value: string | number) => {
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
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList((prev) => [...prev, ""]);
  };

  const removeListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
      totalLectures: Number(form.totalLectures),
      certificate: form.certificate === "yes",
      location: form.mode === "Online" ? "Online" : form.location,
      gallery: gallery.filter((g) => g.trim() !== ""),
      learnings: learnings.filter((l) => l.trim() !== ""),
      requirements: requirements.filter((r) => r.trim() !== ""),
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="h-full w-full overflow-y-auto rounded-none border-0 border-t-4 border-t-indigo-600 bg-white p-4 shadow-sm sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-2xl sm:rounded-3xl sm:border sm:border-slate-200 sm:p-6 sm:p-8">
        <h2 className="flex items-center gap-2.5 text-base font-bold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <FiEdit2 className="h-3.5 w-3.5" />
          </span>
          Edit Course
        </h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">Course Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Level</label>
              <select
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Instructor</label>
              <input
                value={form.instructor}
                onChange={(e) => handleChange("instructor", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Language</label>
              <input
                value={form.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Price (USD)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Original Price</label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) =>
                  handleChange(
                    "originalPrice",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Total Lectures</label>
              <input
                type="number"
                value={form.totalLectures}
                onChange={(e) =>
                  handleChange("totalLectures", Number(e.target.value))
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Duration</label>
              <input
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Certificate</label>
              <select
                value={form.certificate}
                onChange={(e) => handleChange("certificate", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Mode</label>
              <select
                value={form.mode}
                onChange={(e) => handleChange("mode", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            {form.mode !== "Online" && (
              <div>
                <label className="text-xs font-semibold text-slate-700">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Main Image URL</label>
            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Gallery Images</label>
            <div className="mt-1 space-y-2">
              {gallery.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={g}
                    onChange={(e) =>
                      updateListItem(gallery, setGallery, i, e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="https://example.com/gallery-image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(gallery, setGallery, i)}
                    className="shrink-0 text-slate-400 hover:text-red-500"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(setGallery)}
                className="text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
              >
                + Add another image
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Short Description</label>
            <textarea
              value={form.shortDescription}
              onChange={(e) =>
                handleChange("shortDescription", e.target.value)
              }
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              rows={2}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Full Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">
                What You&apos;ll Learn
              </label>
              <div className="mt-1 space-y-2">
                {learnings.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateListItem(learnings, setLearnings, i, e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="e.g. Build responsive websites"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(learnings, setLearnings, i)}
                      className="shrink-0 text-slate-400 hover:text-red-500"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(setLearnings)}
                  className="text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
                >
                  + Add item
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Requirements</label>
              <div className="mt-1 space-y-2">
                {requirements.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateListItem(
                          requirements,
                          setRequirements,
                          i,
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="e.g. A laptop with internet access"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeListItem(requirements, setRequirements, i)
                      }
                      className="shrink-0 text-slate-400 hover:text-red-500"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(setRequirements)}
                  className="text-xs font-semibold text-indigo-600 transition-colors hover:text-violet-600"
                >
                  + Add item
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 bg-white pt-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            disabled={saving}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg disabled:opacity-60 sm:w-auto"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({
  courseTitle,
  onCancel,
  onConfirm,
}: {
  courseTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirmClick = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 border-t-4 border-t-red-500 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Delete this course?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">{courseTitle}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={deleting}
            className="w-full rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:opacity-50 sm:w-auto"
          >
            {deleting ? "Deleting..." : "Yes, delete it"}
          </button>
        </div>
      </div>
    </div>
  );
}