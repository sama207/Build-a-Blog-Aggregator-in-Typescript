import { createFeedFollow, getFeedsByUrl } from "../lib/db/queries/feeds"
import { User } from "../Types/Schema_objs.js"


export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    const url = args[0];
    const feed = await getFeedsByUrl(url);
    const res = await createFeedFollow(feed.id, user.id);

    console.log(`${res.userName} followed ${res.feedName} feed`)
}