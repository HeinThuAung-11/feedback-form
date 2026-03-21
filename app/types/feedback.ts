export interface starRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disable: boolean;
}
export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FeedbackPayload {
  rating: number;
  comment: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
}
