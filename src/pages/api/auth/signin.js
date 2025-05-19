import oracledb from "oracledb";
import { dbConfig } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let connection;

  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO USERS (NAME, USERID, EMAIL, PHONE_NUMBER, PASSWORD) 
       VALUES (:name, user_id_seq.NEXTVAL, :email, :phone, :password)`,
      [name, email, phone, password],
      { autoCommit: true }
    );
    

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
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
