import oracledb from "oracledb";
import { dbConfig } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let connection;

  try {
    const { email, password } = req.body;
    console.log(req.body);
    
    if (!email || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    connection = await oracledb.getConnection(dbConfig);

    // Fetch user details based on username
    const result = await connection.execute(
      `SELECT password FROM (
  SELECT * FROM USERS WHERE email = :email
)
`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const storedPassword = result.rows[0][0]; // Extract password from result

    if (password !== storedPassword) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
