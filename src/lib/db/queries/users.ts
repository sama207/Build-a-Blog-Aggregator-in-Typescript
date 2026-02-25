import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema.js";
import { readConfig } from "../../../config.js";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).onConflictDoNothing({ target: users.name }).returning();
    return result;
}

export async function getUserByName(name: string) {
    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result;
}

export async function getUsers() {
    const result = await db.select({ name: users.name }).from(users);
    return result;
}

export async function loggedInUser() {
    const config = await readConfig();
    if (config.currentUserName !== undefined) {
        return await getUserByName(config.currentUserName);
    } else {
        throw new Error("No user logged in. Please log in to perform this action.");
    }
}

export async function getUserByID(id: string) {
    const [result] = await db.select({ name: users.name }).from(users).where(eq(users.id, id));
    return result;
} 