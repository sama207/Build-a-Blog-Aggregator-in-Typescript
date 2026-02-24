import fs from "fs";
import os from "os";
import path from "path";

import {Config} from "./Types/Config.js";

export function setUser(userName: string): void {
    var cfg = readConfig();
    writeConfig({
        dbUrl: cfg.dbUrl,
        currentUserName: userName
    });

}

export function readConfig(): Config {
    const configPath = getConfigFilePath();
    console.log(`Reading config from: ${configPath}`);

    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, "utf-8");
        // console.log(`initial Config file content: ${data}`);
        return validateConfig(JSON.parse(data));
    }
    else {
        throw new Error("Invalid config path");
    }
}

export function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();

  const jsonToWrite = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };

  fs.writeFileSync(
    filePath,
    JSON.stringify(jsonToWrite, null, 2),
    { encoding: "utf-8" }
  );

}

function validateConfig(rawConfig: any): Config {
    const dbUrlRaw = rawConfig["db_url"];
    const currentUserRaw = rawConfig["current_user_name"];
    
    if (rawConfig === null || typeof rawConfig !== "object") {
        throw new Error("Invalid config: expected an object");
    }
    else if (rawConfig.db_url === undefined || typeof rawConfig.db_url !== "string") {
        throw new Error("Invalid config: missing or invalid 'dbUrl' property");
    }

    return {
        dbUrl: dbUrlRaw,
        currentUserName: currentUserRaw
    };
}