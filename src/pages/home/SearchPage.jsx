import React from "react";
import FeaturesCoursesPage from "../student/course/featuresCoursesPage";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="h-screen flex flex-col  bg-white dark:bg-gray-900">
      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        {query?.length
          ? `Search Results for "${query}"`
          : "No courses found for your search."}
      </h3>

      {query ? (
        <FeaturesCoursesPage search={query} />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Please try a different search term or explore other courses.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
