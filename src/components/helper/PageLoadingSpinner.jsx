import React from "react";
import { Loader2 } from "lucide-react";

const PageLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoadingSpinner;
