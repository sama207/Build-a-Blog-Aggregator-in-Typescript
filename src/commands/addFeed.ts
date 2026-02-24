import { createFeed } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { loggedInUser } from "../lib/db/queries/users";
import { printFeed } from "../feed";

export async function handlerAddFeed(cmdName: string, name: string, URL: string, ...args: string[]) {
    if (name === undefined || URL === undefined) {
        console.log("Not enough arguments were provided. Please provide a name and URL for the feed.");
        process.exit(1);
    }
    const currentUser = await loggedInUser();
    if (currentUser !== undefined) {
        const res = await createFeed(currentUser.name, URL, name);
        if (res !== undefined) {
            printFeed(res, currentUser);
        }
    } else {
        console.log("No user logged in. Please log in to add a feed.");
    }
}