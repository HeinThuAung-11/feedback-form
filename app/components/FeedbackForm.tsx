"use client";

import { useCallback, useRef, useState } from "react";
import { submitFeedback } from "../lib/api";
import { FormStatus } from "../types/feedback";
import { StarRatings } from "./StarRatings";

const MIN_CHARACTER = 10;
const MAX_CHARACTER = 500;
export const validate = (rating: number, comment: string): Record<string, string> => {
  const error: Record<string, string> = {};
  console.log("validate", rating, comment);
  if (rating <= 0) {
    error.rating = "Please give a rating.";
  }
  const trimmedComment = comment.trim();
  if (trimmedComment.length === 0) {
    error.comment = "Please write a comment";
  } else if (trimmedComment.length < MIN_CHARACTER) {
    error.comment = `Comment must be at least ${MIN_CHARACTER} characters.`;
  }
  return error;
};

export const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ratingRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status == "loading";
  const handleRatingChange = useCallback((star: number) => {
    console.log(star);
    setRating(star);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.rating;
      return next;
    });
  }, []);
  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTER) {
      setComment(value);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.comment;
        return next;
      });
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
        } else {
          commentRef.current?.focus();
        }
        return;
      }

      setStatus("loading");
      setErrors({});
      try {
        await submitFeedback({ rating, comment });
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    },
    [rating, comment],
  );
  console.log(errors);
  if (status === "success") {
    if (status === "success") {
      return (
        <div className="w-full max-w-lg mx-auto">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-green-600"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Thank you for your feedback!</h2>
              <p className="text-sm text-gray-500">Your response has been recorded and will help us improve.</p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                Submit Another
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  const charCount = comment.trim().length;
  const charCountColor = charCount > 500 - 50 ? "text-red-700" : "text-black";
  return (
    <div className="w-full max-w-lg p-4 mx-auto">
      <form className="rounded-2xl bg-white p-8 shadow-lg" onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-semibold text-gray-700">Share Your Feedback</h2>
        <p className="text-md text-gray-500">We would love to hear from you.</p>
        <h6 className="text-md text-gray-800">Rating</h6>
        <div ref={ratingRef} tabIndex={-1}>
          <StarRatings rating={rating} onRatingChange={handleRatingChange} disable={false} />
          {errors.rating && (
            <p role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.rating}
            </p>
          )}
        </div>
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
              {charCount}/{MAX_CHARACTER}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? (
            <>
              <svg
                className="size-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
              </svg>
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
