import { getUsers } from "src/lib/db/queries/users";
import { readConfig } from "src/config";
export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const config = await readConfig();

    if (users.length === 0) {
        console.log("No users found.");
    }

    users.forEach((user) => {
        if (user.name === config.currentUserName) {
            console.log(`* ${user.name} (current)`);
        }
        else {
            console.log(`* ${user.name}`);
        }
    });
}