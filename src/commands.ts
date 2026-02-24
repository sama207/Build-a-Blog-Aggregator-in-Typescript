import { CommandsRegistry } from "./Types/Commands_registry.js";
import { CommandHandler } from "./Types/Command_handler.js";

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const exists = registry[cmdName];
    if (exists != undefined && exists != null && typeof exists === "function") {
     await exists(cmdName, ...args);
    }
    else {
        console.error(`Command ${cmdName} not found`);
        process.exit(1);

    }
}