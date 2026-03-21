import { CommentProps } from "../types/feedback";

export const Comment = ({
  comment,
  errors,
  isLoading,
  commentRef,
  handleCommentChange,
  MAX_COMMENT_CHAR,
}: CommentProps) => {
  const charCount = comment.trim().length;
  const hasCharReachedLimit = charCount > MAX_COMMENT_CHAR - 50;
  const charCountColor = hasCharReachedLimit ? "text-red-700" : "text-black";
  return (
    <div>
      <label htmlFor="feedback-comment" className="block text-sm font-medium text-gray-700">
        Comment
      </label>
      <textarea
        ref={commentRef}
        id="feedback-comment"
        value={comment}
        onChange={handleCommentChange}
        disabled={isLoading}
        rows={4}
        placeholder="Tell us what you think..."
        aria-invalid={!!errors.comment}
        aria-describedby="comment-count comment-error"
        className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="mt-1 flex items-center justify-between">
        {errors.comment ? (
          <p id="comment-error" role="alert" className="text-sm text-red-600">
            {errors.comment}
          </p>
        ) : (
          <span />
        )}
        <span id="comment-count" className={`text-xs ${charCountColor}`}>
          {charCount}/{MAX_COMMENT_CHAR}
        </span>
      </div>
    </div>
  );
};
