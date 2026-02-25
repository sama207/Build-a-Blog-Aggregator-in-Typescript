import { getFeeds } from "../lib/db/queries/feeds.js";
import { getUserByID } from "../lib/db/queries/users.js"

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feed = await getFeeds();
    if (feed.length === 0) {
        console.log("No feeds found.");
    } else {
        console.log("Feeds:");
        for (const f of feed) {
            const user = await getUserByID(f.userId);
            if (user !== undefined) {
                console.log(`- ${f.name}(${f.url})`);
                console.log(`- ${user.name}`);
                console.log("-------------------------");
            }
            else {
                console.log("Unknown user");
                continue;
            }
        }
    }
}