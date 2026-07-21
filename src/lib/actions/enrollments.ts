"use server";

import { serverMutation} from "../core/server";

export const enrollInCourse = async (courseId: string) => {
  return serverMutation("/api/enroll", { courseId }, "POST");
};

