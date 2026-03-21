import { CheckCircle } from "lucide-react";
import { resetFormProp } from "../types/feedback";

export const SuccessForm = ({ resetForm }: resetFormProp) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600" />

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
};
