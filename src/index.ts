import { setUser, readConfig } from "./config.js";
import { Config } from "./config.js";

function main() {
  setUser("Sama");
  const readCfg: Config = readConfig();
  console.log(readCfg);
}

main();