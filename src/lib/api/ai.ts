import { protectedFetch} from "../core/server";

type RecommendationItem = {
  courseId: string;
  title?: string;
  reason: string;
};

type RecommendResponse = {
  recommendations: RecommendationItem[];
};

export const getCourseRecommendations = async (
  userId: string,
  category?: string
) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return protectedFetch<RecommendResponse>(
    `/api/ai/recommend/${userId}${query}`,
    "GET"
  );
};

