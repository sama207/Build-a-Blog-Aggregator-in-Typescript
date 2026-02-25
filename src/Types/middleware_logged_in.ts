import { UserCommandHandler } from "./User_command_handler.js"
import { CommandHandler } from "./Command_handler.js"

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;