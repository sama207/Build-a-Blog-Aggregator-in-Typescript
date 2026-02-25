import { loggedInUser } from "src/lib/db/queries/users.js";
import { CommandHandler } from "src/Types/Command_handler.js";
import { UserCommandHandler } from "src/Types/User_command_handler.js";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const user = await loggedInUser(); // must read config + db each time
        if (!user) {
            throw new Error("No user logged in. Please log in first.");
        }
        await handler(cmdName, user, ...args);
    };
}