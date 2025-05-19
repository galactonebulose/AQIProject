"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";  // Assuming cn is a utility function for classnames

export default function AQIGauge({ aqi }) {
  const aqiInt = parseInt(aqi,10);
  const [aqiLevel, setAqiLevel] = useState("");
  const [aqiColor, setAqiColor] = useState("");

  useEffect(() => {
    if (aqiInt <= 50) {
      setAqiLevel("Good");
      setAqiColor("bg-green-500");
    } else if (aqiInt <= 100) {
      setAqiLevel("Moderate");
      setAqiColor("bg-yellow-500");
    } else if (aqiInt <= 150) {
      setAqiLevel("Unhealthy for Sensitive Groups");
      setAqiColor("bg-orange-500");
    } else if (aqiInt <= 200) {
      setAqiLevel("Unhealthy");
      setAqiColor("bg-red-500");
    } else if (aqiInt <= 300) {
      setAqiLevel("Very Unhealthy");
      setAqiColor("bg-purple-700");
    } else {
      setAqiLevel("Hazardous");
      setAqiColor("bg-amber-900");
    }
  }, [aqiInt]);

  const percentage = Math.floor(Math.min(100, (aqiInt / 500) * 100));

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Replaced motion.div with a regular div */}
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            className="opacity-30"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="0"
            className={cn("drop-shadow-lg", aqiColor)}
            style={{
              strokeDashoffset: `${(1 - percentage / 100) * 283}`,  // Manually control the stroke
              transition: 'stroke-dashoffset 1.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900">
            {aqi}
          </span>
          <span className="text-sm font-medium mt-1 text-amber-800">
            {aqiLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
