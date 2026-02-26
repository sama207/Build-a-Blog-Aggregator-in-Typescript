import { argv } from "node:process";

import { CommandsRegistry } from "./Types/Commands_registry.js";
import { registerCommand, runCommand } from "./commands.js";
import { handlerLogin } from "./commands/login.js";
import { handlerRegister } from "./commands/register.js";
import { handlerReset } from "./commands/reset.js";
import { handlerUsers } from "./commands/users.js";
import { handlerAgg } from "./commands/agg.js";
import { handlerAddFeed } from "./commands/addFeed.js";
import { handlerFeeds } from "./commands/feeds.js";
import { handlerFollow } from "./commands/follow.js";
import { handlerFollowing } from "./commands/following.js";
import { handlerUnfollow } from "./commands/unFollow.js";
import { handlerBrowse } from "./commands/browse .js";
import { middlewareLoggedIn } from "./middleware/middleware_logged_in.js";

async function main() {

  var registery: CommandsRegistry = {};

  registerCommand(registery, "login", handlerLogin);
  registerCommand(registery, "register", handlerRegister);
  registerCommand(registery, "reset", handlerReset);
  registerCommand(registery, "users", handlerUsers);
  registerCommand(registery, "agg", handlerAgg);
  registerCommand(registery, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registery, "feeds", handlerFeeds);
  registerCommand(registery, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registery, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registery, "unfollow", middlewareLoggedIn(handlerUnfollow));
  registerCommand(registery, "browse", middlewareLoggedIn(handlerBrowse));

  // print process.argv
  if (argv.length < 3) {
    console.error("Not enough arguments were provided.");
    process.exit(1);
  }

  const cmdName = argv[2];
  const args = argv.slice(3);
  await runCommand(registery, cmdName, ...args);
  process.exit(0);

}

main();