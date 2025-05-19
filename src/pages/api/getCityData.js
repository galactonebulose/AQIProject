import { executeQuery } from "@/utils/db";

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const result = await executeQuery(
      `SELECT
         get_avg_aqi_for_city(:city) AS aqi,
         get_avg_temperature_by_city(:city) AS avg_temperature,
         get_avg_humidity_by_city(:city) AS avg_humidity,
         (
           SELECT AVG(w.wind_speed)
           FROM weatherdata w
           JOIN monitoringstations ms ON w.station_id = ms.stationid
           JOIN cities c ON ms.cityid = c.cityid
           WHERE c.cityname = :city
         ) AS avg_windspeed,
         (
           SELECT AVG(w.rainfall)
           FROM weatherdata w
           JOIN monitoringstations ms ON w.station_id = ms.stationid
           JOIN cities c ON ms.cityid = c.cityid
           WHERE c.cityname = :city
         ) AS avg_rainfall
       FROM dual`,
      [city, city, city, city, city] // Pass city five times for the bind variables
    );

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Data not found for this city!" });
    }

    const row = result[0];

    // Handle null checks
    if (
      row.AQI == null ||
      row.AVG_TEMPERATURE == null ||
      row.AVG_HUMIDITY == null ||
      row.AVG_WINDSPEED == null ||
      row.AVG_RAINFALL == null
    ) {
      return res.status(404).json({ error: "Some environmental data not found for this city!" });
    }

    // Respond with all data
    return res.status(200).json({
      aqi: row.AQI,
      avgTemperature: row.AVG_TEMPERATURE,
      avgHumidity: row.AVG_HUMIDITY,
      avgWindspeed: row.AVG_WINDSPEED,
      avgRainfall: row.AVG_RAINFALL
    });

  } catch (error) {
    console.error("Error fetching city data:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
