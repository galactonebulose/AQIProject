"use client";

import React from 'react';

const SocialButton = ({ icon, onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-16 h-12 flex items-center justify-center rounded-md transition-all duration-300 hover:shadow-md active:scale-[0.98] ${className}`}
    >
      {icon}
    </button>
  );
};

export default SocialButton;