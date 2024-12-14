import { createOrder } from "@/axios/student-course/orderAxios";
import VideoPlayer from "@/components/helper/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useLoading from "@/hooks/useLoading";
import { fetchStudentCourseByIdAction } from "@/redux/student-course/studentCourseAction";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const StudentCourseDetailspage = () => {
  const { studentCourseDetails } = useSelector((state) => state.studentCourse);

  const { user } = useSelector((state) => state.user);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [approvalUrl, setApprovalUrl] = useState("");
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);

  // Course ID from URL parameters and navigation
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchStudentCourseByIdAction(courseId));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) {
      setShowFreePreviewDialog(true);
    }
  }, [displayCurrentVideoFreePreview]);

  // use-effect to switch between enroll now and go to course
  useEffect(() => {
    if (studentCourseDetails && user) {
      const purchased = studentCourseDetails.students.some(
        (student) => student.studentId === user._id
      );
      setIsCoursePurchased(purchased);
    }
  }, [studentCourseDetails, user]);

  // function to handleSetFreePreview
  const handleSetFreePreview = (getCurrenVideoInfo) => {
    setDisplayCurrentVideoFreePreview(getCurrenVideoInfo?.videoUrl);
  };

  // function to handle enroll now
  const handleEnrollNow = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!user?._id) {
      navigate("/login");
      return;
    }
    startLoading();
    const paymentPayload = {
      userId: user?._id,
      userName: user?.userName,
      userEmail: user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentCourseDetails?.instructorId,
      instructorName: studentCourseDetails?.instructorName,
      instructorEmail: studentCourseDetails?.instructorEmail,
      courseImage: studentCourseDetails?.image,
      courseTitle: studentCourseDetails?.title,
      courseId: studentCourseDetails?._id,
      coursePricing: studentCourseDetails?.pricing,
    };
    try {
      const response = await createOrder(paymentPayload);

      // Check and confirm if `approveUrl` is within `response.data`
      if (response?.status === "success" && response?.data?.approveUrl) {
        // Store the order ID in session storage
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(response?.data?.orderId)
        );
        setApprovalUrl(response?.data?.approveUrl);
      } else {
        console.error(
          "Failed to get approval URL or invalid response structure:",
          response
        );
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      stopLoading();
    }
  };

  // Redirect to course progress page
  const handleGoToCourse = () => {
    navigate(`/course-progress/${courseId}`);
  };

  // Redirect after click on buy button
  if (approvalUrl) {
    window.location.href = approvalUrl;
  }

  // Find index of first free preview video
  const getIndexOfFreePreviewUrl =
    studentCourseDetails !== null
      ? studentCourseDetails?.curriculum?.findIndex((item) => item.freePreview)
      : -1;

  return (
    <div className=" mx-auto p-4">
      {/* header */}
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {studentCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{studentCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-4 text-sm">
          <span>Created by {studentCourseDetails?.instructorName}</span>
          <span>Created On {studentCourseDetails?.date.split("T")[0]}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {studentCourseDetails?.primaryLanguage}
          </span>
          <span>
            {studentCourseDetails?.students.length}
            {studentCourseDetails?.students.length <= 1
              ? " Student"
              : " Students"}
          </span>
        </div>
      </div>

      {/*  main course content */}
      <div className="flex flex-col gap-8 mt-8 md:flex-row">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>what you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentCourseDetails?.objectives
                  .split(".")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* course Description card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentCourseDetails?.description}</CardContent>
          </Card>

          {/* course content card  | Curriculum Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentCourseDetails?.curriculum?.map(
                (curriculumItem, index) => (
                  <li
                    key={index}
                    className={`${
                      curriculumItem?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      curriculumItem?.freePreview
                        ? () => handleSetFreePreview(curriculumItem)
                        : null
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{curriculumItem?.title}</span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>

        {/* Video Player and Pricing Section */}
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewUrl !== -1
                      ? studentCourseDetails?.curriculum[
                          getIndexOfFreePreviewUrl
                        ].videoUrl
                      : null
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${studentCourseDetails?.pricing}
                </span>
              </div>

              <Button
                onClick={isCoursePurchased ? handleGoToCourse : handleEnrollNow}
                className="w-full flex items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : isCoursePurchased
                  ? "Enrolled: Go to Course"
                  : "Enroll Now"}
              </Button>
            </CardContent>
          </Card>
        </aside>
        {/* Free Preview Dialog */}
        <Dialog
          open={showFreePreviewDialog}
          onOpenChange={() => {
            setShowFreePreviewDialog(false);
            setDisplayCurrentVideoFreePreview(null);
          }}
        >
          <DialogContent className="w-[800px]">
            <DialogHeader>
              <DialogTitle>Course Preview</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video rounded-lg flex items-center justify-center">
              <VideoPlayer
                url={displayCurrentVideoFreePreview}
                width="450px"
                height="200px"
              />
            </div>
            <div className="flex flex-col gap-2">
              {studentCourseDetails?.curriculum
                ?.filter((item) => item.freePreview)
                .map((filteredItem) => (
                  <p
                    key={filteredItem._id}
                    onClick={() => handleSetFreePreview(filteredItem)}
                    className="cursor-pointer text-[16px] font-medium"
                  >
                    {filteredItem?.title}
                  </p>
                ))}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentCourseDetailspage;
