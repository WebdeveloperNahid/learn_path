"use server";

import { serverMutation } from "../core/server";

// import { protectedFetch, serverMutation } from "../core/server";

type GenerateDescriptionInput = {
  title: string;
  category: string;
  level: string;
  length?: "short" | "medium" | "long";
};

type GenerateDescriptionResponse = {
  description: string;
};

export const generateCourseDescription = async (
  data: GenerateDescriptionInput
) => {
  return serverMutation<GenerateDescriptionResponse>(
    "/api/ai/generate-description",
    data,
    "POST"
  );
};

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

type ChatResponse = {
  reply: string;
};

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[]
) => {
  return serverMutation<ChatResponse>(
    "/api/ai/chat",
    { message, history },
    "POST"
  );
};