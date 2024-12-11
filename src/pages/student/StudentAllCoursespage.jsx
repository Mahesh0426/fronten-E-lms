import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { filterOptions, sortOptions } from "@/config/formConfig";
import { fetchAllStudentCoursesAction } from "@/redux/student-course/studentCourseAction";
import { ArrowUpDownIcon, SearchX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// helper funtion to create search  params
const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  // Iterate over each key-value pair in the filters object
  Object.entries(filterParams).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      // Join the array values into a comma-separated string and encode it
      const paramValue = encodeURIComponent(value.join(","));
      queryParams.push(`${key}=${paramValue}`);
    }
  });

  // Join the query parameters array with '&' to form the query string
  return queryParams.join("&");
};
const StudentAllCoursepage = () => {
  const { studentCourses } = useSelector((state) => state.studentCourse);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState("price-lowtohigh");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  //   function to handle filter on change
  const handleFilterOnChange = (sectionName, selectedOption) => {
    // Create a copy of the current selectedFilters state
    let updatedFilterSelections = { ...selectedFilters };

    // Check if the current section (e.g., category, level, language) already exists in filters
    const sectionExists = updatedFilterSelections[sectionName];

    if (!sectionExists) {
      // If the section does not exist, add the selected option
      updatedFilterSelections[sectionName] = [selectedOption.id];
    } else {
      // Toggle filter selection
      const isOptionAlreadySelected = sectionExists.includes(selectedOption.id)
        ? sectionExists.filter((optionId) => optionId !== selectedOption.id) // Uncheck: remove the option
        : [...sectionExists, selectedOption.id]; // Check: add the option

      // If there are no options left in the section, remove the section from the filters
      if (isOptionAlreadySelected.length === 0) {
        delete updatedFilterSelections[sectionName];
      } else {
        updatedFilterSelections[sectionName] = isOptionAlreadySelected;
      }
    }
    // Update filters state and save the updated filters in session storage
    setSelectedFilters(updatedFilterSelections);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilterSelections));
  };

  // function to fetch  student courses
  const fetchStudentsViewCourses = (selectedFilters, sort) => {
    const query = new URLSearchParams({
      ...selectedFilters,
      sortBy: sort,
    });
    dispatch(fetchAllStudentCoursesAction(query));
  };

  // updates the URL query parameters whenever the filters change.
  useEffect(() => {
    const buildQueryStringForFilters =
      createSearchParamsHelper(selectedFilters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [selectedFilters]);

  // useeffect to load filters from session storage when component mounts
  useEffect(() => {
    setSort("price-lowtohigh");
    setSelectedFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // remove filters from session storage when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  // use effect to fetch all the courses whenever the filters or sorting change
  useEffect(() => {
    if (selectedFilters !== null && sort !== null)
      fetchStudentsViewCourses(selectedFilters, sort);
  }, [selectedFilters, sort]);

  return (
    <div className=" container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> All courses</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/*  aside section with Filters sidebar */}
        <aside className="w-full space-y-4 md:w-64">
          <div className="h-[540px]  overflow-y-auto ">
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="p-4 space-y-4">
                <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-3"
                    >
                      <Checkbox
                        checked={
                          selectedFilters[keyItem]?.includes(option.id) || false
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* main conent */}
        <main className="flex-1">
          {/* Course sorting */}
          <div className="flex justify-end items-center mb-4 gap-5 mr-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="font-medium text-[16px]">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => {
                    setSort(value);
                  }}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm font-bold text-black">
              {studentCourses.length} Results
            </span>
          </div>

          {/* Course listing */}

          <div className="space-y-4 overflow-y-auto max-h-[500px] ">
            {studentCourses && studentCourses.length > 0 ? (
              studentCourses.map((courseItem) => (
                <Card
                  key={courseItem?._id}
                  className="cursor-pointer transition-all duration-300 ease-in hover:shadow-lg hover:scale-101"
                  onClick={() => navigate(`/course/details/${courseItem?._id}`)}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        alt="course image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1 font-bold">
                        Created by{" "}
                        <span className="font-bold">
                          {courseItem?.instructorName.charAt(0).toUpperCase() +
                            courseItem?.instructorName.slice(1)}
                        </span>
                      </p>
                      <p className="text-black mb-2 mt-3 text-[16px]">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseItem?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="w-full p-12 flex flex-col items-center justify-center">
                <SearchX
                  className="w-16 h-16 text-muted-foreground/40 mb-6"
                  strokeWidth={1.4}
                />

                <h1 className="font-extrabold text-4xl mb-3 text-center">
                  Sorry!! No course available at the moment
                </h1>

                <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
                  Try adjusting other categories to find what you're looking for
                </p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAllCoursepage;
