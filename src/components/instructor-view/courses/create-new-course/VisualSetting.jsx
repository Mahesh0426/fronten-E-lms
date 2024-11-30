import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { uploadMedia } from "@/axios/uploadAxios";
import useLoading from "@/hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseDetailsFormData,
  setMediaUploadProgressPercentage,
} from "@/redux/instructor-course/courseSlice";
import MediaProgressBar from "@/components/helper/media-progress/MediaProgressBar";

const VisualSetting = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { mediaUploadProgressPercentage, courseDetailsFormData } = useSelector(
    (state) => state.course
  );

  const dispatch = useDispatch();

  // function to handle image upload change events
  const handleImageUploadChange = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        startLoading();
        const response = await uploadMedia(imageFormData, (progress) => {
          dispatch(setMediaUploadProgressPercentage(progress));
        });

        if (response.status === "success") {
          dispatch(
            setCourseDetailsFormData({
              ...courseDetailsFormData,
              image: response.data.url,
            })
          );
        }
        stopLoading();
      } catch (error) {
        console.log(error);
        stopLoading();
      }
    }
  };
  // console.log("image courseDetailsFormData", courseDetailsFormData);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Setting</CardTitle>
        </CardHeader>

        {/* progress bar */}
        {isLoading ? (
          <MediaProgressBar
            isMediaUploading={isLoading}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}

        <CardContent>
          {courseDetailsFormData?.image ? (
            <img
              src={courseDetailsFormData?.image}
              alt="Course Image"
              className="w-80 h-60 object-cover rounded-md"
            />
          ) : (
            <div className="flex flex-col gap-3">
              <Label>Upload Course Thumnail</Label>
              <Input
                type="file"
                accept="image/*"
                className="mb-4"
                onChange={handleImageUploadChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualSetting;
