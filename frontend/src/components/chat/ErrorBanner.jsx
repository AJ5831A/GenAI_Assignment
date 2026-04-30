import { AlertCircle } from "lucide-react";

export function ErrorBanner({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mx-5 mb-4 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 lg:mx-8" role="alert">
      <AlertCircle size={18} aria-hidden="true" />
      {message}
    </div>
  );
}
