"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@murderbeard/logger");
const logger = new logger_1.default({
    name: '@murderbeard/xmpp',
    level: 'error',
    streams: [{
            level: 'error',
            path: './error.log'
        }]
});
if (process.env['NODE_ENV'] === 'development') {
    logger.addStream({
        level: 'info',
        stream: process.stdout
    });
    logger.addStream({
        level: 'debug',
        path: 'debug.log'
    });
}
exports.default = logger;
//# sourceMappingURL=logger.js.map