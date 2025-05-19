"use client";
//Code for CITY MARKER has been commented out
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

//import CityMarker from "../components/CityMarker";

import Image from "next/image";

// const CITY_POSITIONS = {
//   Ahmedabad: { lat: 23.0225, lon: 72.5714 },
//   Aizawl: { lat: 23.7271, lon: 92.7176 },
//   Amaravati: { lat: 16.5062, lon: 80.6480 },
//   Amritsar: { lat: 31.6340, lon: 74.8723 },
//   Bengaluru: { lat: 12.9716, lon: 77.5946 },
//   Bhopal: { lat: 23.2599, lon: 77.4126 },
//   Delhi: { lat: 28.7041, lon: 77.1025 },
//   Mumbai: { lat: 19.0760, lon: 72.8777 },
//   Chennai: { lat: 13.0827, lon: 80.2707 },
//   Kolkata: { lat: 22.5726, lon: 88.3639 },
// };

const MapPage = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");
  const [mapSize, setMapSize] = useState({ width: 771, height: 900 });
  const router = useRouter();
  const searchInputRef = useRef(null);
  const mapRef = useRef(null);
  const cityName = "Mumbai";
  
  useEffect(() => {
    const updateSize = () => {
      if (mapRef.current) {
        setMapSize({
          width: mapRef.current.clientWidth,
          height: mapRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const checkCityExists = async (cityName) => {
    try {
      console.log(cityName);
      const response = await fetch(`/api/checkCity?city=${cityName}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking city:", error);
      return false;
    }
  };

  const handleSearch = async () => {
    if (!selectedCity) return;

    const exists = await checkCityExists(selectedCity);
    if (exists) {
      router.push(`/city/${selectedCity}`);
    } else {
      setError(`City "${selectedCity}" not found in the database.`);
      setTimeout(() => setError(""), 3000);
    }
  };

  // const handleCityClick = async (cityName) => {
  //   const exists = await checkCityExists(cityName);
  //   if (exists) {
  //     router.push(`/city/${cityName}`);
  //   } else {
  //     setError(`City "${cityName}" not found in the database.`);
  //     setTimeout(() => setError(""), 3000);
  //   }
  // };

  // const convertLatLonToPixels = (lat, lon) => {
  //   const minLat = 8, maxLat = 37, minLon = 68, maxLon = 97;
  //   return {
  //     x: ((lon - minLon) / (maxLon - minLon)) * mapSize.width,
  //     y: mapSize.height - ((lat - minLat) / (maxLat - minLat)) * mapSize.height,
  //   };
  // };

  return (
    <div className="map-container">
      <h1 className="map-title">India Air Quality Index Map</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="search-input"
          ref={searchInputRef}
        />
        <button onClick={handleSearch} className="search-button">
          <Search size={18} /> <span className="ml-2">Search</span>
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="map-wrapper" ref={mapRef}>
        <Image
          src="/India-map-en.svg.png"
          alt="India Map"
          layout="responsive"
          width={771}
          height={900}
          className="india-map"
        />

       {/* <div className="marker-overlay">
          {Object.entries(CITY_POSITIONS).map(([city, { lat, lon }]) => {
            const { x, y } = convertLatLonToPixels(lat, lon);
            return (
              <CityMarker key={city} city={city} x={x} y={y} onClick={() => handleCityClick(city)} />
            );
          })}
        </div>*/}
      </div>
      <div>
        <button onClick={() => router.push("/feedback")} className="feedback-button">FeedBack</button>
      </div>
    </div>
  );
};

export default MapPage;
