import { CommandHandler } from "./Command_handler";

// Record<string, CommandHandler> = object map like:
// {
//   login: handlerLogin,
//   register: handlerRegister,
// }

export type CommandsRegistry = Record<string, CommandHandler>;