import { reset } from "drizzle-seed";

import { db } from "../index";
import * as schema from "../schema";

export async function resetDB() {
    await reset(db, schema);
}