"use client"; // (only if using app router in Next.js 13+)

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router"; // or 'next/navigation' for app router

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 md:top-8 md:left-8 p-2 rounded-full bg-amber-100/70 border border-amber-200 shadow-md backdrop-blur-sm hover:bg-amber-200/80 transition-colors duration-300"
    >
      <ArrowLeft className="h-5 w-5 text-amber-900" />
    </button>
  );
}
