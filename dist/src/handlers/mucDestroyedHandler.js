"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class MucDestroyedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.info(colors.bgGreen('*'), colors.bgGreen(`-- ${this.name} --`));
            this.subject.next(this.name);
        };
        this.name = 'muc:destroyed';
    }
}
exports.default = MucDestroyedHandler;
//# sourceMappingURL=mucDestroyedHandler.js.map