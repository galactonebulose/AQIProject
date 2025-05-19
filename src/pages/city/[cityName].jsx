"use client";
import {useRouter } from "next/router";
import { useEffect, useState } from "react";

import AQIGauge from "@/components/AQIGauge";
import WeatherCard from "@/components/WeatherCard";
import CityBackground from "@/components/CityBackground";
import BackButton from "@/components/BackButton";
import AQIHazardLevel from "@/components/AQIHazardLevel";
import { Droplets, Wind, Thermometer, InfoIcon, CloudRainWind, MessageSquare } from "lucide-react";

export default function CityPage() {
  const router = useRouter();
  const { cityName } = router.query;

  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cityName) return;

    const fetchCityData = async () => {
      try {
        const response = await fetch(`/api/getCityData?city=${encodeURIComponent(cityName)}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCityData(data);
        } else {
          setError(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError("Failed to fetch city data");
      }
    };

    fetchCityData();
  }, [cityName]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 relative">
        <CityBackground aqi={300} />
        <BackButton />
        <div className="bg-white/80 p-6 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-red-800">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-red-100 border border-red-200 rounded-lg text-red-900 hover:bg-red-200 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CityBackground aqi={150} />
        <div className="text-gray-800 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const aqi = cityData.AQI || cityData.aqi || 0;
  const temperature = cityData.avgTemperature || "N/A";
  const humidity = cityData.avgHumidity || "N/A";
  const windSpeed = cityData.avgWindspeed || "N/A";
  const rainfall = cityData.avgRainfall || "N/A";
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <CityBackground aqi={aqi} />
      <BackButton />
      <div className="bg-white/80 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          {decodeURIComponent(String(cityName))}
        </h1>
        <p className="text-center text-gray-600 mb-6">Air Quality Details</p>

        <AQIGauge aqi={Math.floor(aqi)} />
        <AQIHazardLevel aqi={aqi} />

        <div className="grid grid-cols-1 md:grid-rows-3 gap-4 mt-8">
          <WeatherCard
            icon={<Thermometer className="h-5 w-5" />}
            title="Temperature"
            value={`${temperature}°C`}
          />
          <WeatherCard
            icon={<Droplets className="h-5 w-5" />}
            title="Humidity"
            value={`${humidity}%`}
          />
          <WeatherCard
            icon={<Wind className="h-5 w-5" />}
            title="Wind Speed"
            value={`${windSpeed}`}//insert from weather table
          />
          <WeatherCard
            icon={<CloudRainWind className="h-5 w-5"/>}
            title="Rainfall"
            value={`${rainfall}`}//insert from table
             />
        </div>
        <div className="grid gap-4 mt-8">
        <WeatherCard
        icon={<InfoIcon className="h-5 w-5" />} 
       
        value={<button 
        variant="outline" 
        className="text-lg font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
        onClick={() => router.push(`/healthAdvisory?city=${cityName}`)}>
        View Health Advisory
      </button>}
      />
    </div>
    <div className="grid gap-4 mt-8">
      <WeatherCard 
      icon = {<MessageSquare className = "h-5,w-5"/>} 
      value = {<button variant="outline" className="text-lg font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200" onClick={() => router.push("/feedback")}>FeedBack</button>}/>
      </div>
        <div className="mt-8 text-center text-sm text-gray-700">
          <p>Data last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
