"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { useSession } from "@/lib/auth-client";
import {
  
  sendRecommendationFeedback,
} from "@/lib/actions/ai";
import { getCourseRecommendations } from "@/lib/api/ai";

type Recommendation = {
  courseId: string;
  title?: string;
  reason: string;
};

export default function RecommendedForYou() {
  const { data: session } = useSession();
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const result = await getCourseRecommendations(session.user.id);
      setRecs(result?.recommendations || []);
      setLoading(false);
    };
    load();
  }, [session?.user?.id]);

  const handleDismiss = async (courseId: string) => {
    if (!session?.user?.id) return;
    setRecs((prev) => prev.filter((r) => r.courseId !== courseId));
    await sendRecommendationFeedback(session.user.id, courseId, "dismissed");
  };

  const handleClick = async (courseId: string) => {
    if (!session?.user?.id) return;
    await sendRecommendationFeedback(session.user.id, courseId, "clicked");
  };

  if (loading || recs.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-5 flex items-center gap-2">
        <HiSparkles className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recs.map((r) => (
          <div
            key={r.courseId}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-bold text-slate-900">
              {r.title || "Recommended Course"}
            </p>
            <p className="mt-1 text-xs text-slate-500">{r.reason}</p>
            <div className="mt-3 flex items-center justify-between">
              <Link
                href={`/all-course/${r.courseId}`}
                onClick={() => handleClick(r.courseId)}
                className="text-xs font-semibold text-indigo-600 hover:text-violet-600"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDismiss(r.courseId)}
                className="text-xs font-semibold text-slate-400 hover:text-red-500"
              >
                Not interested
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}