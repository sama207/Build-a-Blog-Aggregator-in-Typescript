import { eq, and, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, feedFollows, users } from "../schema.js";
import { getUserByName } from "./users.js";
import { fetchFeed } from "../../../feed.js";
import { createPost } from "../queries/posts.js"
export async function createFeed(userName: string, feedUrl: string, feedTitle: string) {
    const userId = await getUserByName(userName);
    const [createFeed] = await db.insert(feeds).values({ userId: userId["id"], url: feedUrl, name: feedTitle }).returning();
    const [followedFeed] = await db.insert(feedFollows).values({ userId: userId["id"], feedId: createFeed.id }).returning();
    return createFeed;
}

export async function getFeeds() {
    return await db.select().from(feeds)
}

export async function getFeedsByUrl(url: string) {
    return [await db.select().from(feeds).where(eq(feeds.url, url))];
}

export async function createFeedFollow(feedId: string, userId: string) {
    let newFeedFollow;
    try {
        [newFeedFollow] = await db
            .insert(feedFollows)
            .values({ userId, feedId })
            .returning();
    } catch (e: any) {
        // postgres unique violation
        if (e?.cause?.code === "23505") {
            throw new Error("You are already following that feed.");
        }
        throw e; // unknown DB error
    } const [res] = await db.select({ userName: users.name, feedName: feeds.name })
        .from(feedFollows)
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .where(eq(feedFollows.id, newFeedFollow.id));
    if (!res) {
        throw new Error("Failed to create feed follow (join returned no row).");
    }

    return res

}
export async function getFeedFollowsForUser(userId: string) {
    const res = await db.select({ userName: users.name, feedName: feeds.name, feedUrl: feeds.url, feedId: feeds.id })
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .where(eq(feedFollows.userId, userId));

    if (res !== undefined) {
        for (const f of res) {
            console.log(f);
        }
        return res;
    } else {
        throw new Error("res is undefined");
    }
}

export async function unfollowFeed(feedId: string, userId: string) {
    const res = await db.delete(feedFollows)
        .where(and(eq(feedFollows.feedId, feedId), eq(feedFollows.userId, userId)))
        .returning()

    if (res !== undefined) {
        return res
    }
    else {
        console.log("coudnt unfollow feed , make sure you actually followed the feed before.")
    }
}

export async function markFeedFetched(feedId: string) {
    return await db.update(feeds)
        .set({ updatedAt: new Date(), lastFetchedAt: new Date() })
        .where(eq(feeds.id, feedId))
}

export async function getNextFeedToFetch() {
    return await db.select().from(feeds).orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`).limit(1)
}

export async function scrapeFeeds() {
    const feedToFetch = await getNextFeedToFetch()
    const feedId = feedToFetch[0]["id"]
    if (feedId == null || feedId == undefined) {
        console.log("No feeds to fetch")
        return
    }
    const rss = await fetchFeed(feedToFetch[0].url);

    if (rss != undefined) {
        await markFeedFetched(feedId);
        var count: number = 0;
        console.log("items in feed : ")
        for (const feedInfo of rss.channel.item) {
            console.log(`${count}- ${feedInfo.title}`)
            await createPost(feedInfo, feedId)
            count++
        }
    }
}