"use client";

import { FallbackProps } from "react-error-boundary";
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <FiAlertCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h1>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <p className="text-red-800 dark:text-red-200 text-sm font-mono">
            {error.message}
          </p>
        </div>

        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FiRefreshCw className="w-4 h-4 mr-2" />
          Try again
        </button>

        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
          If the problem persists, please refresh the page or contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;