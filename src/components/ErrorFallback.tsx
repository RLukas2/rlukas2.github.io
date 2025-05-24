"use client";

import { FallbackProps } from "react-error-boundary";
import { FiAlertCircle } from 'react-icons/fi';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
