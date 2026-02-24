import { argv } from "node:process";

import { registerCommand, runCommand } from "./commands.js";
import { handlerLogin } from "./commands/login.js";
import { handlerRegister } from "./commands/register.js";
import { handlerReset } from "./commands/reset.js";
import { handlerUsers } from "./commands/users.js";
import { handlerAgg } from "./commands/agg.js";
import { handlerAddFeed } from "./commands/addFeed.js";
import { handlerFeeds } from "./commands/feeds.js";
import { CommandsRegistry } from "./Types/Commands_registry.js";

async function main() {

  var registery: CommandsRegistry = {};
  registerCommand(registery, "login", handlerLogin);
  registerCommand(registery, "register", handlerRegister);
  registerCommand(registery, "reset", handlerReset);
  registerCommand(registery, "users", handlerUsers);
  registerCommand(registery, "agg", handlerAgg);
  registerCommand(registery, "addfeed", handlerAddFeed);
  registerCommand(registery, "feeds", handlerFeeds);

  // print process.argv
  if (argv.length < 3 ) {
    console.error("Not enough arguments were provided.");
    process.exit(1);
  }

  const cmdName=argv[2];
  const args=argv.slice(3);
  await runCommand(registery, cmdName, ...args);
  process.exit(0);
  
}

main();