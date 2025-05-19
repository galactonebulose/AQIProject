"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/textarea";
import BackButton from "@/components/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import submitFeedback from "@/utils/submitFeedback";

// Define validation schema using Zod
const feedbackSchema = z.object({
  comments: z.string()
    .min(5, { message: "Feedback must be at least 5 characters" })
    .max(200, { message: "Feedback cannot exceed 200 characters" })
});

export default function Feedback() {
  const { toast } = useToast();
  const [feedbackMessage, setFeedbackMessage] = useState(""); // State to hold feedback message
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comments: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await submitFeedback(data.comments);
      console.log(data.comments);
      
      // Set the success message
      setFeedbackMessage("Thank you for your feedback!");
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setFeedbackMessage("");
      }, 3000);
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue submitting your feedback. Please try again.",
        duration: 3000
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-amber-50 to-amber-100">
      <BackButton />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-amber-900">Share Your Feedback</h1>
        <p className="text-center text-amber-700">We value your thoughts and suggestions</p>

        {/* Feedback Success Message */}
        {feedbackMessage && (
          <div className="bg-amber-100 text-amber-800 p-4 rounded mb-4 text-center">
            {feedbackMessage}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-amber-900">Comments</label>
            <Textarea 
              placeholder="Tell us what you think about our service..." 
              className="min-h-[120px] resize-none border-amber-200 focus-visible:ring-amber-500"
              {...form.register("comments")}
            />
            <div className="flex justify-between text-xs text-amber-600">
              <span>Share your thoughts (5-200 characters)</span>
              <span className={`${form.watch("comments")?.length > 180 ? 'text-red-500 font-medium' : ''}`}>
                {form.watch("comments")?.length}/200
              </span>
            </div>
            {form.formState.errors.comments && (
              <span className="text-red-500 text-xs">{form.formState.errors.comments.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
