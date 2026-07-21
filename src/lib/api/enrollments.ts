"use server"

import { protectedFetch } from "../core/server";

export const getUserEnrollments = async (userId: string) => {
  return protectedFetch(`/api/enroll/user/${userId}`, "GET");
};