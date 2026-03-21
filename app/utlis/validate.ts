const MIN_COMMENT_CHAR = 10;
export const validate = (rating: number, comment: string): Record<string, string> => {
  const error: Record<string, string> = {};
  if (rating <= 0) {
    error.rating = "Please give a rating.";
  }
  const trimmedComment = comment.trim();
  if (trimmedComment.length === 0) {
    error.comment = "Please write a comment";
  } else if (trimmedComment.length < MIN_COMMENT_CHAR) {
    error.comment = `Comment must be at least ${MIN_COMMENT_CHAR} characters.`;
  }
  return error;
};
