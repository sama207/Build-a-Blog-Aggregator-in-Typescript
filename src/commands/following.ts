import { User } from "../Types/Schema_objs.js"
import { getFeedFollowsForUser } from "src/lib/db/queries/feeds";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    await getFeedFollowsForUser(user.id)
}