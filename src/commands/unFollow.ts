import { unfollowFeed, getFeedsByUrl } from "../lib/db/queries/feeds.js";
import { User } from "../Types/Schema_objs.js"

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    console.log("in unfollowed handler")

    const loggedUser = user.id;
    const feed = await getFeedsByUrl(args[0]);
    const feedId = feed.id;

    if (loggedUser && feedId) {
        const res = await unfollowFeed(feedId, loggedUser)
        if (res) {
            console.log("unfollowed feed succefully ")
        }
    }
    else {
        throw new Error("noe logged in user , or the user is not following the feed.")
    }
}