import oracledb from "oracledb";

// Oracle DB Configuration
export const dbConfig = {
  user: "system",   
  password: "Aaryan",  
  connectString: "localhost:1521/XE",
};

// Function to get a connection
export async function getConnect() {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error("Oracle DB Connection Error:", err);
    throw err;
  }
}

// Function to execute a query
export async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await getConnect();
    const result = await connection.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows;
  } catch (err) {
    console.error("Oracle DB Query Error:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
