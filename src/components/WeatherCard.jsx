"use client";

import React from "react";

const WeatherCard = ({ icon, title, value }) => {
  return (
    <div className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 shadow-md border border-amber-200 backdrop-blur-sm transition-opacity duration-500 ease-out opacity-100 translate-y-0">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-amber-100 border border-amber-200 text-amber-800">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-700">{title}</h3>
          <p className="text-2xl font-bold text-amber-900">{value}</p>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-amber-50/30 z-0"></div>
    </div>
  );
};

export default WeatherCard;
