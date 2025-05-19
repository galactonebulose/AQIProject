// src/pages/api/healthadvisory.js

import oracledb from "oracledb";
import { dbConfig } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const city = req.query.city;
    console.log("Received request for city:", city);

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    let connection;

    try {
      connection = await oracledb.getConnection(dbConfig);
      console.log("Connected to database, calling procedure for city:", city);

      const result = await connection.execute(
        `
        BEGIN
          get_health_advisory_for_city1(
            :city,
            :healthEffects,
            :precautions,
            :lethalityLevel,
            :description,
            :affecteddemographics
          );
        END;
        `,
        {
          city: city,
          healthEffects: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
          precautions: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
          lethalityLevel: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
          description: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
          affecteddemographics: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 }
        }
      );

      // Extract the output values from the result
      const { healthEffects, precautions, lethalityLevel, description, affecteddemographics } = result.outBinds;

      res.status(200).json({
        healthEffects,
        precautions,
        lethalityLevel,
        description,
        affecteddemographics,  // Now include the affecteddemographics in the response
      });

    } catch (error) {
      console.error("Error fetching health advisory:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
