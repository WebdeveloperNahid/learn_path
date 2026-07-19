"use server";

import { TCourse, TMutationResponse } from "@/types/cours";
import { protectedFetch, serverMutation } from "../core/server";

// UPDATE
export const updateCourse = async (
  id: string,
  updateData: Partial<TCourse> & { userId: string },
) => {
  return serverMutation<TMutationResponse>(`/api/add-course/${id}`, updateData, "PATCH");
};

// DELETE
export const deleteCourse = async (id: string, userId: string) => {
  return serverMutation<TMutationResponse>(`/api/add-course/${id}?userId=${userId}`, undefined, "DELETE");
};

// GET - শুধু নিজের Courses
export const getMyCourses = async (userId: string) => {
  return protectedFetch<TCourse[]>(`/api/add-course/user/${userId}`);
};