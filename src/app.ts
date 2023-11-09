import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/api";
import { databaseConnection } from "./database";
import { CONSTANTS } from "./config";

dotenv.config();
const app = express();

const appPromise = async () => {
  app.use(express.json({ limit: "100mb" }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  await databaseConnection();

  app.use("/api", router);
  app.use("*", (_, res) => {
    return res.status(404).send("Invalid Route Provided!");
  });

  app.listen(CONSTANTS.PORT, () => {
    console.log(
      `Server is running on port: http://localhost:${CONSTANTS.PORT} `
    );
  });
};

appPromise();
