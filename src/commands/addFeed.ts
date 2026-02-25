import { createFeed } from "../lib/db/queries/feeds";
import { printFeed } from "../feed";
import { User } from "../Types/Schema_objs.js"
    ;
export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    const loggedUser = user.name;
    const [feedName, URL] = args;
    if (feedName === undefined || URL === undefined) {
        throw new Error("Not enough arguments were provided. Please provide a name and URL for the feed.");
    }

    if (loggedUser !== undefined) {
        const res = await createFeed(loggedUser, URL, feedName);
        if (res !== undefined) {
            printFeed(res, user);
        }
    } else {
        console.log("No user logged in. Please log in to add a feed.");
    }
}