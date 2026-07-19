"use server";

import { TCreateCours, TMutationResponse } from "@/types/cours";
import { serverMutation } from "../core/server";

export const createAddCours = async (payload: TCreateCours) => {
  return serverMutation<TMutationResponse>(
    "/api/add-course",
    payload,
    "POST",
  );
};