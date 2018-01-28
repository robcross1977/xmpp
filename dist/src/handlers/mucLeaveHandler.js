"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class MucLeaveHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.green('#'), colors.green(`-- ${this.name} --`));
            this.subject.next(this.name);
        };
        this.name = 'muc:leave';
    }
}
exports.default = MucLeaveHandler;
//# sourceMappingURL=mucLeaveHandler.js.map