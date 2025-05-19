"use client";

import React from "react";

export default function CityBackground({ aqi }) {
  const smogOpacity = Math.min(0.8, Math.max(0.1, aqi / 500));
  const particleCount = Math.min(40, Math.max(5, Math.floor(aqi / 10)));

  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/747a7d27-ed54-4da3-80d7-afacc778309d.png')", 
          opacity: 0.15
        }}
      />

      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-600/20"
        style={{ mixBlendMode: "multiply" }}
      />

      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to bottom, rgba(218, 165, 32, ${smogOpacity}), rgba(184, 134, 11, ${smogOpacity * 0.6}))`,
          mixBlendMode: "overlay" 
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-amber-200/40 animate-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
