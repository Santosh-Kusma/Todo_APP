import cors from "cors";

export const corsConfig = cors({
  origin: process.env.ALLOW_ORIGIN,
  credentials: true,
});
