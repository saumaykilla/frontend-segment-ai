import React from "react";

const Loading =
  () => {
    return (
      <div
        id="loading-overlay"
        className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-[60] "
      >
        <div className="bg-white p-8  flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800">
            Generating
            Insights
          </h3>
          <p className="text-gray-500 mt-2 text-center max-w-xs">
            Our
            AI
            is
            analyzing
            data
            for
            your
            selected
            segment
            and
            business
            objective...
          </p>
        </div>
      </div>
    );
  };

export default Loading;
