import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  mediaDelete,
  uploadMedia,
} from "@/axios/instructor-course/uploadAxios";
import useLoading from "@/hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseDetailsFormData,
  setMediaUploadProgressPercentage,
} from "@/redux/instructor-course/courseSlice";
import MediaProgressBar from "@/components/helper/media-progress/MediaProgressBar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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

  const handleReplaceImage = async () => {
    try {
      if (!courseDetailsFormData?.image) return;

      // Extract public_id from the image URL if you're using Cloudinary
      const imageUrl = courseDetailsFormData.image;
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public_id from the URL

      startLoading();

      // Call your backend API to delete the image from Cloudinary
      const response = await mediaDelete(publicId);
      console.log("delete image", response);

      if (response.status === "success") {
        // Update the Redux state to remove the image
        dispatch(
          setCourseDetailsFormData({
            ...courseDetailsFormData,
            image: null,
          })
        );
      }

      stopLoading();
    } catch (error) {
      console.error("Error deleting image:", error);
      stopLoading();
    }
  };
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
            <div className="relative w-80 h-60">
              {/* Image */}
              <img
                src={courseDetailsFormData?.image}
                alt="Course Image"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Label>Upload Course Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                className="mb-4"
                onChange={handleImageUploadChange}
              />
            </div>
          )}
          {/* delete button */}
          <Button className="mt-5 bg-red-900" onClick={handleReplaceImage}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete thumbnail
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualSetting;
