"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const logger_1 = require("../logger");
class JoinedSpecificRoomHandler extends handler_1.default {
    constructor(roomName) {
        super();
        this.handler = (data) => {
            logger_1.default.info({ data: data }, this.name);
            this.subject.next(this.name);
            // We need to complete it so that it moves on to the next
            // piece. Also we are going to remove the handler since
            // it is a one-time only object. 
            this.subject.complete();
        };
        this.name = `${roomName}-joined`;
    }
}
exports.default = JoinedSpecificRoomHandler;
//# sourceMappingURL=joinedSpecificRoomHandler.js.map