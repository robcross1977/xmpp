"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
class Config {
    constructor() {
        this._configs = {
            development: {
                createAnonRoomTimeout: 2000,
                createAnonRoomRetryCount: 3,
                defaultNick: 'daemon'
            }
        };
    }
    getConfig(environment) {
        if (environment in this._configs) {
            return this._configs[environment];
        }
        else {
            throw new Error('config not found');
        }
    }
}
;
logger_1.default.info({ env: process.env.NODE_ENV }, 'getting config');
exports.default = new Config().getConfig(process.env.NODE_ENV || 'development');
//# sourceMappingURL=config.js.map