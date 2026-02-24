import { feeds } from "./lib/db/schema/feeds";
import { users } from "./lib/db/schema/users";

export type Feed = typeof feeds.$inferSelect; 
export type User = typeof users.$inferSelect; 