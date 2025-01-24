import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FeedbackSection = () => {
  const [result, setResult] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    // Create the formData object
    const formData = new FormData(event.target);

    const ACCESS_KEY = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("");
        toast("Feedback Submitted Successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        toast(data.message);
        setResult("");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("");
      s;
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">
        Leave a Feedback
      </h4>
      <div className="flex flex-col space-y-2">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto text-gray-600"
        >
          <Input
            className="w-full border border-gray-500 rounded py-3 px-4 mt-2"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Textarea
            className="w-full border border-gray-500 rounded py-3 px-4 mt-2 h-20 resize-none"
            name="feedback"
            placeholder="Write a feedback"
            required
          />
          <button
            className="bg-blue-600 text-white py-2 px-12 mt-4 rounded-full hover:bg-blue-700"
            type="submit"
          >
            {result ? result : <>Submit</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSection;
