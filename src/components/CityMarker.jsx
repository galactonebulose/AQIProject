"use client";

import React, { useState, useCallback } from "react";

const CityMarker = ({ city, x, y, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onClick(city), [city, onClick]);

  return (
    <g
      className="city-marker"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* City Marker Circle */}
      <circle
        cx={x}
        cy={y}
        r={isHovered ? 10 : 6} // Enlarges on hover
        fill={isHovered ? "#4ecdc4" : "#ff6b6b"} // Cyan on hover, red default
        stroke="#ffffff"
        strokeWidth={2}
        style={{ transition: "r 0.2s ease-in-out, fill 0.2s ease-in-out" }}
      />
      
      {/* City Label on Hover */}
      {isHovered && (
        <g>
          {/* Background Rectangle for better visibility */}
          <rect
            x={x - 25}
            y={y - 30}
            width="50"
            height="20"
            rx="5"
            fill="rgba(0,0,0,0.7)"
          />
          {/* City Name Text */}
          <text
            x={x}
            y={y - 15}
            textAnchor="middle"
            fontSize="12px"
            fill="white"
            fontWeight="bold"
            pointerEvents="none"
            style={{ transition: "opacity 0.2s ease-in-out" }}
          >
            {city}
          </text>
        </g>
      )}
    </g>
  );
};

export default CityMarker;
