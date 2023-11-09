export const CONSTANTS = {
  MONGODB_URL:
    process.env.MONGO_URI ||
    "MONGO_URI= mongodb+srv://hanzlarajput:hsrajput786%40@cluster0.fnawbb2.mongodb.net/shopping",
  PORT: process.env.PORT || 8080,
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || "user-access-sceret-key",
  REFRESH_SECRET_KEY:
    process.env.REFRESH_SECRET_KEY || "user-access-sceret-key",
};
