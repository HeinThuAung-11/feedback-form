"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { submitFeedback } from "../lib/api";
import { ErrorsProp, FormStatus } from "../types/feedback";
import { validate } from "../utlis/validate";
import { Comment } from "./Comment";
import { StarRatings } from "./StarRatings";
import { SuccessForm } from "./SuccessForm";

export const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<ErrorsProp>({
    rating: null,
    comment: null,
  });
  const ratingRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = useMemo(() => status === "loading", [status]);
  const MAX_COMMENT_CHAR = 500;

  const handleRatingChange = useCallback((star: number) => {
    console.log(star);
    setRating(star);
    setErrors((prev) => ({ ...prev, rating: null }));
  }, []);

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_CHAR) {
      setComment(value);
      setErrors((prev) => ({ ...prev, rating: null }));
    }
  }, []);

  const resetForm = useCallback(() => {
    setRating(0);
    setComment("");
    setErrors({});
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validatedErrors = validate(rating, comment);
      if (Object.keys(validatedErrors).length > 0) {
        setErrors(validatedErrors);
        if (validatedErrors.rating) {
          ratingRef.current?.focus();
        } else if (validatedErrors.comment) {
          commentRef.current?.focus();
        }
        return;
      }

      setStatus("loading");
      try {
        await submitFeedback({ rating, comment });
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    },
    [rating, comment],
  );

  if (status === "success") {
    return <SuccessForm resetForm={resetForm} />;
  }

  return (
    <div className="w-full max-w-lg p-4 mx-auto">
      <form className="rounded-2xl bg-white p-8 shadow-lg" onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-semibold text-gray-700">Share Your Feedback</h2>
        <p className="text-md text-gray-500">We would love to hear from you.</p>
        <h6 className="text-md text-gray-800">Rating</h6>
        <div ref={ratingRef} tabIndex={-1}>
          <StarRatings rating={rating} errors={errors} onRatingChange={handleRatingChange} disable={false} />
        </div>
        <Comment
          comment={comment}
          errors={errors}
          isLoading={isLoading}
          commentRef={commentRef}
          handleCommentChange={handleCommentChange}
          MAX_COMMENT_CHAR={MAX_COMMENT_CHAR}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
};
