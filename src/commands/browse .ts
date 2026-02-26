import { User } from "../Types/Schema_objs.js"
import { getPostsForUser } from "src/lib/db/queries/posts.js";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    var limit = 2
    if (args.length > 0) {
        const parsed = Number(args[0]);
        if (!isNaN(parsed) && parsed > 0) {
            limit = parsed;
        }
    }
    const res = await getPostsForUser(user, limit)

    if (res.length === 0) {
        console.log("No posts found, seems the user hadnt follow any feeds");
        return;
    }

    for (var post of res) {
        console.log(`${post.title}\n Url: ${post.url}\nPublished: ${post.publishedAt}\nDescription:${post.description}\n--------------------------------------`)
    }

} 