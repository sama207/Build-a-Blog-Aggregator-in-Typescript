import { eq, and, sql } from "drizzle-orm";
import { db } from "..";
import { posts } from "../schema.js";
import { feedInfo } from "../../../Types/feed_info.js"
import { User } from "../../../Types/Schema_objs.js"
import { getFeedFollowsForUser } from "../queries/feeds.js";

export async function createPost(feedInfo: feedInfo, feedId: string) {
    var pubDateString: Date | null = feedInfo.pubDate;
    const d = new Date(pubDateString);
    if (isNaN(d.getTime())) pubDateString = null;
    else pubDateString = d;
    try {
        await db.insert(posts)
            .values(
                {
                    title: feedInfo.title,
                    url: feedInfo.link,
                    description: feedInfo.description,
                    publishedAt: pubDateString,
                    feedId: feedId
                }
            )
    } catch(err){
        console.log("post already exist")
    }
}

export async function getPostsForUser(user: User, limit?: number) {
    if (limit == null) limit = 2;
    const userFeeds = await getFeedFollowsForUser(user.id)
    const userPosts = []
    for (var feeds of userFeeds) {
        const feedId = feeds.feedId;
        const [res] = await db.select()
            .from(posts)
            .where(eq(posts.feedId, feedId))
            .orderBy(sql`${posts.publishedAt} ASC NULLS LAST`).limit(limit)
        userPosts.push(res)
    }
    return userPosts
}