import { feeds } from "../lib/db/schema.js";
import { users } from "../lib/db/schema.js";

export type Feed = typeof feeds.$inferSelect; 
export type User = typeof users.$inferSelect; 