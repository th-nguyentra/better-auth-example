import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  appName: "My Next.js App",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
