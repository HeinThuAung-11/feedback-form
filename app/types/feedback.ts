export interface starRatingProps {
  rating: number;
  errors: ErrorsProp;
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

export type resetFormProp = { resetForm: () => void };

export type ErrorsProp = Record<string, string | null>;

export type CommentProps = {
  comment: string;
  errors: ErrorsProp;
  isLoading: boolean;
  commentRef: React.RefObject<HTMLTextAreaElement | null>;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  MAX_COMMENT_CHAR: number;
};
