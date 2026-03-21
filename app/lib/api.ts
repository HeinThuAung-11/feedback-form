"use client";

import { FeedbackPayload, FeedbackResponse } from "../types/feedback";

const SIMULATED_DELAY_MS = 1500;

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Thanks for your ${payload.rating}-star rating!`,
      });
    }, SIMULATED_DELAY_MS);
  });
}
