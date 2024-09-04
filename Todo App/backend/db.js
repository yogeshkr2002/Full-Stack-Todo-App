import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log("Connected to PostgreSQL");
} catch (error) {
  console.error("Unable to connect:", error);
}

export default sequelize;
