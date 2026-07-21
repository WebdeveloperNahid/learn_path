"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { enrollInCourse } from "@/lib/actions/enrollments";


type EnrollButtonProps = {
  courseId: string;
  courseTitle: string;
  price: number;
};

export default function EnrollButton({ courseId, courseTitle, price }: EnrollButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    if (!session?.user?.id) {
      router.push("/login");
      return;
    }
    setError("");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await enrollInCourse(courseId);
      setEnrolled(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Enrollment failed or you're already enrolled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={enrolled}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:shadow-lg hover:shadow-indigo-300 disabled:opacity-60"
      >
        {enrolled ? "Enrolled ✓" : "Enroll Now"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-extrabold text-slate-900">Confirm Enrollment</h3>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Enroll in <span className="font-bold">{courseTitle}</span> for{" "}
              <span className="font-bold text-indigo-700">${price}</span>?
            </p>

            {error && (
              <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Enrolling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}