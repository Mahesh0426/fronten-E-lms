import React from "react";

import FeaturesCoursesPage from "../student/course/featuresCoursesPage";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  console.log(query);

  return (
    <div className=" m-6 p-5">
      <h3 className="mb-4 text-xl font-semibold">
        {query?.length
          ? `Search Results for "${query}"`
          : "No courses found for your search."}
      </h3>

      {query ? (
        <FeaturesCoursesPage search={query} />
      ) : (
        <p className="text-gray-600">
          Please try a different search term or explore other courses.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
