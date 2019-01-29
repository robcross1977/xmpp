"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
class Config {
    static get(key) {
        return this.envConfig[key];
    }
}
Config.envConfig = dotenv.parse(fs.readFileSync(`.env`));
exports.Config = Config;
//# sourceMappingURL=config.js.map