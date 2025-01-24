import React, { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  createReview,
  getReviewByCourseId,
} from "@/axios/student-course/reviewAxios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Review = ({ currentCourse }) => {
  const courseId = currentCourse?.courseDetails?._id;
  const { user } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);

  // function to handle review submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewObj = {
      studentId: user?._id,
      courseId: courseId,
      rating,
      comment,
    };
    // Here you would typically send this data to your backend
    const response = await createReview(reviewObj);
    if (response.status === "success") {
      toast.success(response.message);
    }

    setRating(0);
    setComment("");
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await getReviewByCourseId(courseId);

      if (response.status === "success") {
        setReviews(response.data);
        // Check if the current user has already submitted a review
        const userReview = response.data.find(
          (review) => review.studentId._id === user?._id
        );
        setHasReviewed(!!userReview);
      }
    };
    getReviews();
  }, [courseId, user?._id]);

  return (
    <div className="container mx-auto p-4  dark:bg-gray-800 ">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Reviews</h2>

      {/* Existing Reviews */}
      <div className="space-y-4 mb-8 dark:bg-gray-900 ">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white  p-4 rounded-lg shadow dark:rounded-lg dark:bg-gray-900"
          >
            <div className="mb-2">
              <span className="font-semibold block mb-1 dark:text-white">
                {review?.studentId?.userName}
              </span>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "gold" : "none"}
                    stroke={i < review.rating ? "gold" : "currentColor"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-white">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow dark:bg-gray-900"
      >
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Leave a Review
        </h3>
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={24}
              className="cursor-pointer"
              fill={index < rating ? "gold" : "none"}
              stroke={index < rating ? "gold" : "currentColor"}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4 dark:text-white"
        />
        <Button
          type="submit"
          className="flex p-6 justify-center rounded-md bg-indigo-600 text-white "
          disabled={hasReviewed}
        >
          {hasReviewed ? "Already Reviewed" : "Submit Review"}
          <Send size={16} className="ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default Review;
