import oracledb from 'oracledb';
import { dbConfig } from '@/utils/db'; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { comment } = req.body;

    // Log incoming request body for debugging
    console.log('Received request body:', req.body);

    // Basic validation for feedback length
    if (!comment || comment.length < 5 || comment.length > 200) {
      return res.status(400).json({ message: "Invalid feedback. It must be between 5 and 200 characters." });
    }

    let connection;
    try {
      // Get a connection using dbConfig
      connection = await oracledb.getConnection(dbConfig);

      // Prepare the SQL query with the new column name COMM
      const result = await connection.execute(
        `INSERT INTO feedbacks (COMM) VALUES (:1)`, 
        [comment],  // Pass comment as an array, binding the :comment placeholder
        { autoCommit: true }  // Commit the transaction
      );

      console.log("Inserted feedback:", result);  // Log the result for debugging

      res.status(200);
    } catch (error) {
      console.error("Error inserting feedback:", error);
      res.status(500).json({ message: "Error submitting feedback" });
    } finally {
      if (connection) {
        await connection.close();  // Close the connection
      }
    }
  } else {
    // Handle unsupported request methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}