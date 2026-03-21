"use client";
import { FeedbackForm } from "./components/FeedbackForm";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 font-sans">
      <FeedbackForm />
    </main>
  );
}
