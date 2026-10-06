import { Suspense } from "react";
import RegisterSuccessContent from "./RegisterSuccessContent";

export default function RegisterSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      }
    >
      <RegisterSuccessContent />
    </Suspense>
  );
}