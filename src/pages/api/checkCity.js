import { executeQuery } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { city } = req.query;
  city.toLowerCase();
  try {
    const query = "SELECT * FROM cities WHERE CITYNAME = :city";
    const result = await executeQuery(query,{ city });

    if (result.length > 0) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
