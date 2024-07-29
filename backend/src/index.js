import dotenv from "dotenv";
import connectDB from "./db/db.config.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Db connection error", error);
    process.exit(1);
  });
