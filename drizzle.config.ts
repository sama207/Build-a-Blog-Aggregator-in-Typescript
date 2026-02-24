import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "src/lib/DB/schema.ts",
    out: "src/lib/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        // postgres://username:password@host:port/database
        url: "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
    },
});