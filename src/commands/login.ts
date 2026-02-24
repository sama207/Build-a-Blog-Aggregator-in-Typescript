import { setUser } from "../config";
import {getUser} from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length == 0) {
        console.error("At least a Username is required for login");
        process.exit(1);
    }
    else {
        const userInfo = await getUser(args[0]);
        if (!userInfo) {
            console.error(`User ${args[0]} not found. Please register first.`);
            process.exit(1);
        }
        setUser(args[0]);
        console.log(`Logged in as ${args[0]}`);
    }
}