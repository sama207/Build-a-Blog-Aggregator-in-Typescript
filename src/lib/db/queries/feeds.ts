import { db } from "..";
import { feeds } from "../schema";
import { getUser } from "./users";

export async function createFeed(userName: string, feedUrl: string, feedTitle: string) {
    const userId = await getUser(userName);
    const [res] = await db.insert(feeds).values({ userId: userId["id"], url: feedUrl, name: feedTitle }).returning();
    return res;
}

export async function getFeeds() {
    const res = await db.select().from(feeds);
    return res;
}