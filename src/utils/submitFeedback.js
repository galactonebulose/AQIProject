"use client";
import axios from "axios";

// Function to submit feedback data
const submitFeedback = async (comment) => {
  try {
    // Send the feedback (comments) to the backend API
    const response = await axios.post("/api/submitFeedback", { comment });
console.log(comment)
    // Check if the response is successful
    if (response.status === 200) {
      console.log("Feedback submitted successfully:", response.data);
    }
  } catch (error) {
    // Handle errors during the API request
    console.error("Error submitting feedback:", error);
    throw new Error("Failed to submit feedback");
  }
};

export default submitFeedback;
