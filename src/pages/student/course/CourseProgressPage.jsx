import {
  getCurrentCourseProgress,
  markLectureAsViewed,
  resetCourseProgress,
} from "@/axios/student-course/courseProgressAxios";
import { Button } from "@/components/ui/button";
import { setStudentCurrentCourseProgress } from "@/redux/student-course/studentCourseSlice";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactConfetti from "react-confetti";
import { Label } from "@/components/ui/label";
import VideoPlayer from "@/components/helper/VideoPlayer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import StudentAssignment from "@/components/student-view/quiz and assignment/StudentAssignment";
import StudentQuiz from "@/components/student-view/quiz and assignment/StudentQuiz";

const CourseProgressPage = () => {
  const { user } = useSelector((state) => state.user);

  const { studentCurrentCourseProgress } = useSelector(
    (state) => state.studentCourse
  );
  const [isLockCourse, setIsLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  //function to fetch current course progress
  const fetchCurrentCourseProgress = async () => {
    try {
      const response = await getCurrentCourseProgress(user?._id, courseId);

      if (response.status === "success") {
        if (!response?.data?.isPurchased) {
          setIsLockCourse(true);
        } else {
          dispatch(
            setStudentCurrentCourseProgress({
              courseDetails: response?.data?.courseDetails,
              progress: response?.data?.progress,
            })
          );
          if (response?.data?.completed) {
            setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
            setShowCourseCompleteDialog(true);
            setShowConfetti(true);
            return;
          }
          if (response?.data?.progress?.length === 0) {
            setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          } else {
            // Use findLastIndex to find the last lecture that was viewed
            const lastIndexOfViewedAsTrue =
              response?.data?.progress.findLastIndex((obj) => obj.viewed);

            // If no lectures were viewed, lastIndexOfViewedAsTrue will be -1, so we start at index 0
            const nextLectureIndex = lastIndexOfViewedAsTrue + 1;
            setCurrentLecture(
              response?.data?.courseDetails?.curriculum[nextLectureIndex]
            );
          }
        }
      }
    } catch (error) {
      console.log("internal error occure", error);
    }
  };

  // function to handleProgressUpdate
  const handleProgressUpdate = (updatedProgress) => {
    setCurrentLecture(updatedProgress);
  };

  // function to handle re-watch
  const handleRewatchCourse = async () => {
    try {
      const response = await resetCourseProgress(
        user?._id,
        studentCurrentCourseProgress?.courseDetails?._id
      );

      if (response?.status === "success") {
        setCurrentLecture(null);
        setShowConfetti(false);
        setShowCourseCompleteDialog(false);
        fetchCurrentCourseProgress();
      }
    } catch (error) {
      console.error("Failed to reset course progress:", error);
    }
  };

  // function to update course progress
  const updateCourseProgress = async () => {
    if (currentLecture) {
      const response = await markLectureAsViewed(
        user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.status === "success") {
        fetchCurrentCourseProgress();
      }
    }
  };

  // determine hasNext and hasPrev
  const curriculum =
    studentCurrentCourseProgress?.courseDetails?.curriculum || [];
  const currentIndex = curriculum.findIndex(
    (lecture) => lecture._id === currentLecture?._id
  );
  const hasNext = currentIndex < curriculum.length - 1;
  const hasPrev = currentIndex > 0;

  // function to handle  watch next video
  const handleNextVideo = () => {
    if (hasNext) {
      setCurrentLecture(curriculum[currentIndex + 1]);
    }
  };

  // function to handle  watch prev video
  const handlePrevVideo = () => {
    if (hasPrev) {
      setCurrentLecture(curriculum[currentIndex - 1]);
    }
  };

  //fetch current course progress when page mount
  useEffect(() => {
    if (user?._id && courseId) {
      fetchCurrentCourseProgress();
    }
  }, [user, courseId]);

  // show progress
  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  // confetti show/hide
  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 5000);
  }, [showConfetti]);

  return (
    <div className="flex flex-col h-screen  bg-gray-900 text-white">
      {showConfetti && <ReactConfetti />}

      {/* header section  */}
      <div className="flex items-center justify-between p-4  border-b bg-gray-900 border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => {
              navigate("/student-courses");
            }}
            className="  text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to my courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* video player section and  other*/}
      <div className="flex flex-1   overflow-y-auto ">
        {/* video player section  */}
        <div
          className={`flex-1 w-full ${
            isSideBarOpen ? "sm:mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={handleProgressUpdate}
            progressData={currentLecture}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onNextVideo={handleNextVideo}
            onPrevVideo={handlePrevVideo}
          />
          <div className="p-6   bg-gray-900">
            <h2 className="text-2xl font-bold  bg-gray-900 mb-2">
              {currentLecture?.title}
            </h2>
          </div>

          {/* quiz and assignent bar section  */}
          <Card className=" mt-5 h-full rounded-none ">
            <CardContent>
              <Tabs defaultValue="quizzes">
                <TabsList className=" mt-2 grid w-80 grid-cols-3 space-x-4">
                  <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="quizzes">
                  <StudentQuiz />
                </TabsContent>
                <TabsContent value="assignments">
                  <StudentAssignment />
                </TabsContent>
                <TabsContent value="review">No review Yet</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* side bar section  */}
        <div
          className={`fixed top-[70px] right-0 bottom-0 w-[400px] bg-slate-100 border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          } hidden sm:block`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="  text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="  text-black rounded-none h-full"
              >
                OverView
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-2 text-sm text-black font-bold cursor-pointer"
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 " />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-black">
                    About this course
                  </h2>
                  <p className="text-black">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Course Lock Dialog */}
      <Dialog open={isLockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Course Complete Dialog */}
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <span className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseProgressPage;
