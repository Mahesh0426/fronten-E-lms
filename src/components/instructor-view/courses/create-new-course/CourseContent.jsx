import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Replace, Trash2, Upload } from "lucide-react";
import { initialCourseContentFormData } from "@/config/formConfig";
import { mediaDelete, uploadMedia } from "@/axios/uploadAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseContentFormData,
  setMediaUploadProgressPercentage,
} from "@/redux/instructor-course/courseSlice";
import MediaProgressBar from "@/components/helper/media-progress/MediaProgressBar";
import useLoading from "@/hooks/useLoading";
import VideoPlayer from "@/components/helper/VideoPlayer";
import { toast } from "react-toastify";
import { deleteLectureAction } from "@/redux/instructor-course/courseAction";
import LoadingSpinner from "@/components/helper/loading-spinner/LoadingSpinner";

const CourseContent = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { mediaUploadProgressPercentage, courseContentFormData, course } =
    useSelector((state) => state.course);
  const [loadingStates, setLoadingStates] = useState({});

  const dispatch = useDispatch();

  // Validate courseContentFormData
  const isFormDataValid = () => {
    return courseContentFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  // Handle Add Lecture
  const handleAddLecture = () => {
    // Check if the limit of 12 lectures is reached
    if (courseContentFormData.length >= 12) {
      toast.error("You cannot add more than 12 lectures.");
      return;
    }
    const updatedData = [
      ...courseContentFormData,
      {
        ...initialCourseContentFormData[0],
      },
    ];
    dispatch(setCourseContentFormData(updatedData));
  };

  // Handle Input Change
  const handleCourseChange = (e, currentIndex) => {
    const updatedData = [...courseContentFormData];
    updatedData[currentIndex] = {
      ...updatedData[currentIndex],
      title: e.target.value,
    };
    dispatch(setCourseContentFormData(updatedData));
  };

  // Handle Free Preview Toggle
  const handleFreePreviewChange = (currentValue, currentIndex) => {
    const updatedData = [...courseContentFormData];
    updatedData[currentIndex] = {
      ...updatedData[currentIndex],
      freePreview: currentValue,
    };
    dispatch(setCourseContentFormData(updatedData));
  };

  // Handle Replace Video
  const handleReplaceVideo = async (currentIndex) => {
    const updatedData = [...courseContentFormData];
    const currentVideoPublicId = updatedData[currentIndex]?.public_id;

    try {
      const response = await mediaDelete(currentVideoPublicId);
      if (response.status === "success") {
        toast.success(response.message);
        updatedData[currentIndex] = {
          ...updatedData[currentIndex],
          videoUrl: "",
          public_id: "",
        };
        dispatch(setCourseContentFormData(updatedData));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Single Lecture Upload
  const handleSingleLectureUpload = async (e, currentIndex) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        startLoading();
        const response = await uploadMedia(videoFormData, (progress) => {
          dispatch(setMediaUploadProgressPercentage(progress));
        });

        const updatedData = [...courseContentFormData];
        updatedData[currentIndex] = {
          ...updatedData[currentIndex],
          videoUrl: response?.data?.url,
          public_id: response?.data?.public_id,
        };
        dispatch(setCourseContentFormData(updatedData));
        stopLoading();
      } catch (error) {
        console.error(error);
        stopLoading();
      }
    }
  };

  // Handle Delete Lecture
  const handleDeleteLecture = async (currentIndex) => {
    let updatedData = [...courseContentFormData];
    const getCurrentSelectedVideoPublicId = updatedData[currentIndex].public_id;

    try {
      // Set loading state for the current lecture
      setLoadingStates((prevState) => ({ ...prevState, [currentIndex]: true }));
      // delete the video file from cloudinary
      const responseDeleteVideo = await mediaDelete(
        getCurrentSelectedVideoPublicId
      );

      if (responseDeleteVideo.status === "success") {
        // Proceed to delete the lecture from the database
        const lectureId = updatedData[currentIndex]._id;
        dispatch(deleteLectureAction(course._id, lectureId));

        // Remove the lecture from the local state
        updatedData = updatedData.filter((_, index) => index !== currentIndex);
        dispatch(setCourseContentFormData(updatedData));
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the lecture");
    } finally {
      // Reset loading state for the current lecture
      setLoadingStates((prevState) => ({
        ...prevState,
        [currentIndex]: false,
      }));
    }
  };

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Course Content</CardTitle>
        <Button
          onClick={handleAddLecture}
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={!isFormDataValid() || isLoading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Lecture
        </Button>
      </CardHeader>
      <CardContent>
        {/* progress bar */}
        <MediaProgressBar
          isMediaUploading={isLoading}
          progress={mediaUploadProgressPercentage}
        />
        <ScrollArea className="h-[700px] pr-4">
          {courseContentFormData.map((lecture, index) => (
            <div
              key={index}
              className="mb-6 p-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* ---lecture and free preview-- */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Lecture {index + 1}
                </h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={courseContentFormData[index]?.freePreview}
                    onCheckedChange={(value) => {
                      handleFreePreviewChange(value, index);
                    }}
                    id={`freePreview ${index + 1}`}
                  />
                  <Label
                    htmlFor={`freePreview ${index + 1}`}
                    className="text-sm text-gray-600"
                  >
                    Free Preview
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                {/* ---lecture title--- */}
                <div>
                  <Input
                    name={`title ${index + 1}`}
                    placeholder="Enter title for your lecture"
                    value={courseContentFormData[index]?.title}
                    onChange={(e) => {
                      handleCourseChange(e, index);
                    }}
                    className="mt-1 "
                  />
                </div>

                {/* ---lecture video--- */}
                <div className="mt-2">
                  {courseContentFormData[index]?.videoUrl ? (
                    <div className="flex gap-3">
                      <VideoPlayer
                        url={courseContentFormData[index]?.videoUrl}
                        width="450px"
                        height="200px"
                      />
                      <Button onClick={() => handleReplaceVideo(index)}>
                        <Replace className="mr-2 h-4 w-4" /> Replace Video
                      </Button>
                      <Button
                        className="bg-red-900"
                        disabled={loadingStates[index]}
                        onClick={() => handleDeleteLecture(index)}
                      >
                        {loadingStates[index] ? (
                          <LoadingSpinner size={16} /> // Show loading spinner
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Lecture
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <Label
                        htmlFor={`video-${index}`}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                          </p>
                          <p className="text-xs text-gray-500">
                            MP4, WebM or OGG (MAX. 800MB)
                          </p>
                        </div>
                        <Input
                          id={`video-${index}`}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            handleSingleLectureUpload(e, index);
                          }}
                        />
                      </Label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CourseContent;
