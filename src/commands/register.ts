import { createUser } from "../lib/db/queries/users";
import { setUser } from "../config.js";

export async function handlerRegister(cmdName: string, userName: string): Promise<void> {
    if (userName.length > 2) {
        const userInfo = createUser(userName);

        if (await userInfo) {
            setUser(userName);
            console.log(`User ${userName} registered successfully!`);
        } else {
            console.log(`Register failed: user already exists with name ${userName}.`);
            process.exit(1);
        }
    } else {
        throw new Error("Username must be at least 3 characters long.");
    }

}