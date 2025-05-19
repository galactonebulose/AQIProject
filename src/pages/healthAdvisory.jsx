"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import BackButton from "@/components/BackButton";
import {
  ArrowRightCircle,
  Shield,
  ThermometerSnowflake,
  Users,
  FileText,
} from "lucide-react";

const HealthAdvisory = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { city } = router.query;
    if (!city) {
      setError("No city provided in URL parameters");
      setLoading(false);
      console.error("No city Provided");
      return;
    }

    setFadeIn(true);

    const fetchAdvisory = async () => {
      try {
        console.log("Fetching advisory for city:", city);
        const response = await axios.get(`/api/healthadvisory`, { params: { city } });
        console.log("Advisory response:", response.data);
        setAdvisory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advisory:", error);
        setError(`Error: ${error.message}`);
        setLoading(false);
      }
    };
    fetchAdvisory();
  }, [router.isReady, router.query]);

  if (!advisory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-600">Loading health advisory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton />

      <div className={`max-w-4xl mx-auto transition-opacity duration-700 `}>
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-700">
          Health Advisory Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdvisoryCard
            title="Health Effects"
            icon={<ArrowRightCircle className="h-5 w-5" />}
            content={advisory.healthEffects}
          />

          <AdvisoryCard
            title="Precautions"
            icon={<Shield className="h-5 w-5" />}
            content={advisory.precautions}
          />

          <AdvisoryCard
            title="Lethality"
            icon={<ThermometerSnowflake className="h-5 w-5" />}
            content={advisory.lethalityLevel}
          />

          {advisory.affecteddemographics && (
            <AdvisoryCard
              title="Affected Demographics"
              icon={<Users className="h-5 w-5" />}
              content={advisory.affecteddemographics}
            />
          )}
        </div>

        <div
          className={`mt-6 transition-opacity duration-700 delay-200 ${
            fadeIn ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <Card className="glass-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-700" />
                <span>Detailed Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="description">Advisory Description</Label>
                <Textarea
                  id="description"
                  readOnly
                  className="h-32 bg-amber-50/50 border-amber-200"
                  value={advisory.description}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AdvisoryCard = ({ title, icon, content }) => {
  return (
    <div className="transition-transform duration-700 ease-in-out transform hover:scale-[1.02]">
      <Card className="glass-card shadow-md h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-amber-700">{icon}</span>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800">{content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAdvisory;
