import { setUser } from "../config";
import { getUserByName } from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length == 0) {
        throw new Error("At least a Username is required for login");
    }
    else {
        const userInfo = await getUserByName(args[0]);
        if (!userInfo) {
            throw new Error(`User ${args[0]} not found. Please register first.`);
        }
        setUser(args[0]);
        console.log(`Logged in as ${args[0]}`);
    }
}