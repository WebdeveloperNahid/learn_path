"use server";

import { TCourse } from "@/types/cours";
import { protectedFetch, serverFetch } from "../core/server";

// Get -- All Courses (search, filter, sort, pagination সহ)
export type CourseFilters = {
  search?: string;
  category?: string;
  level?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

type TCoursesResponse = {
  courses: TCourse[];
  total: number;
  page: number;
  totalPages: number;
};

export const getAllCourses = async (
  filters: CourseFilters = {}
): Promise<TCoursesResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.level) params.set("level", filters.level);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", filters.page);

  const query = params.toString();
  const data = await serverFetch<TCoursesResponse>(
    `/api/add-course${query ? `?${query}` : ""}`,
    `/all-course${query ? `?${query}` : ""}`
  );

  return data ?? { courses: [], total: 0, page: 1, totalPages: 1 };
};

//--------------------------------------<<<----

// Get -- Single Course By ID
export const getCourseById = async (id: string): Promise<TCourse | null> => {
  const data = await serverFetch<TCourse>(
    `/api/add-course/${id}`,
    `/all-course/${id}`
  );
  return data ?? null;
};

// Get -- Latest 6 Courses (Home page "Featured Courses" section এর জন্য)
export const getLatestCourses = async (): Promise<TCourse[]> => {
  const data = await serverFetch<TCourse[]>(`/api/add-course/latest`);
  return data ?? [];
};

// Get -- শুধু নির্দিষ্ট Instructor এর নিজের Courses (Manage Courses পেজের জন্য)
export const getMyCourses = async (userId: string): Promise<TCourse[]> => {
  const data = await protectedFetch<TCourse[]>(
    `/api/add-course/user/${userId}`,
    "/dashboard/instructor/manage-courses"
  );
  return data ?? [];
};