import { resetDB } from "../lib/db/queries/reset";
import { getUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
    await resetDB();
    const users = await getUsers();
    if (users.length === 0) {
        console.log("Database reset successfully!");
    }
    else {
        handlerReset(cmdName, ...args);
    }
}