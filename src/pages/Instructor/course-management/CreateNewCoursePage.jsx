import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Paintbrush, PlusCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CourseContent from "@/components/instructor-view/courses/create-new-course/CourseContent";
import CourseDetails from "@/components/instructor-view/courses/create-new-course/CourseDetails";
import VisualSetting from "@/components/instructor-view/courses/create-new-course/VisualSetting";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseAction,
  fetchCourseByIdAction,
  updateCourseByIdAction,
} from "@/redux/instructor-course/courseAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetForms,
  setCourseContentFormData,
  setCourseDetailsFormData,
  setCurrentEditedCourseId,
} from "@/redux/instructor-course/courseSlice";
import {
  initialCourseContentFormData,
  initialCourseDetailsFormData,
} from "@/config/formConfig";

const CreateNewCoursePage = () => {
  const {
    courseDetailsFormData,
    courseContentFormData,
    currentEditedCourseId,
  } = useSelector((state) => state.course);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [activeTab, setActiveTab] = useState("course-content");
  const [progress, setProgress] = useState(33);

  // handle progress
  const updateProgress = (tab) => {
    const progressMap = {
      "course-content": 33,
      "course-details": 66,
      "visual-setting": 100,
    };
    setProgress(progressMap[tab] || 33);
    setActiveTab(tab);
  };

  // Helper function to check if a value is empty
  const isEmpty = (value) =>
    Array.isArray(value) ? value.length === 0 : value === "" || value == null;

  //function to validate formDATA
  const validateFormData = () => {
    const isCourseDetailsFormDataValid = Object.values(
      courseDetailsFormData
    ).every((value) => !isEmpty(value));

    if (!isCourseDetailsFormDataValid) return false;

    const hasFreePreview = courseContentFormData.some(
      (item) =>
        !isEmpty(item.title) &&
        !isEmpty(item.videoUrl) &&
        !isEmpty(item.public_id) &&
        item.freePreview
    );

    return hasFreePreview;
  };

  // function to  create or update a course
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const courseSubmittedFormData = {
      instructorId: user?._id,
      instructorEmail: user?.userEmail,
      instructorName: user?.userName,
      date: new Date(),
      ...courseDetailsFormData,
      students: [],
      curriculum: courseContentFormData,
      isPublised: true,
    };

    try {
      // Dispatch the action to create  or update a course
      currentEditedCourseId !== null
        ? dispatch(
            updateCourseByIdAction(
              currentEditedCourseId,
              courseSubmittedFormData
            )
          )
        : dispatch(createCourseAction(courseSubmittedFormData));

      // Reset  forms
      dispatch(resetForms());

      navigate(-1);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  useEffect(() => {
    if (params?.courseId) {
      dispatch(setCurrentEditedCourseId(params.courseId));
      dispatch(fetchCourseByIdAction(params.courseId));
      dispatch(setCourseDetailsFormData(initialCourseDetailsFormData));
      dispatch(setCourseContentFormData(initialCourseContentFormData));
    }
  }, [params, dispatch]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {currentEditedCourseId !== null
                  ? "Edit Course"
                  : "Create new Course"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="w-48" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {progress}% Complete
              </span>
            </div>
          </div>

          <Button
            disabled={!validateFormData()}
            onClick={handleOnSubmit}
            variant="default"
            size="lg"
            className="flex p-6 justify-center rounded-md bg-indigo-600   text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {currentEditedCourseId !== null ? (
              <div className="flex items-center ">
                <Save className="w-5 h-5 mr-2" /> Update course
              </div>
            ) : (
              <div className="flex items-center ">
                <PlusCircle className="w-5 h-5 mr-2" /> Create Course
              </div>
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardContent className="p-6">
              <Tabs
                value={activeTab}
                onValueChange={updateProgress}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <TabsList className="grid grid-cols-3 w-full max-w-2xl gap-3 p-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl">
                    {[
                      {
                        id: "course-content",
                        icon: BookOpen,
                        label: "Content",
                      },
                      {
                        id: "course-details",
                        icon: FileText,
                        label: "Details",
                      },
                      {
                        id: "visual-setting",
                        icon: Paintbrush,
                        label: "Visual",
                      },
                    ].map(({ id, icon: Icon, label }) => (
                      <TabsTrigger
                        key={id}
                        value={id}
                        className="relative group data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg transition-all duration-300 rounded-xl py-3"
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            scale: activeTab === id ? 1 : 0.9,
                            opacity: activeTab === id ? 1 : 0.7,
                          }}
                          className="flex items-center gap-2"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{label}</span>
                          {activeTab === id && (
                            <Badge
                              variant="secondary"
                              className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                            >
                              Active
                            </Badge>
                          )}
                        </motion.div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="course-content" className="mt-6">
                      <CourseContent />
                    </TabsContent>
                    <TabsContent value="course-details" className="mt-6">
                      <CourseDetails />
                    </TabsContent>
                    <TabsContent value="visual-setting" className="mt-6">
                      <VisualSetting />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateNewCoursePage;
