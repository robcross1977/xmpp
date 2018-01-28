"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class ConnectedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.error(colors.red('!'), colors.red(`-- ${this.name} --`));
            console.dir(data);
            this.subject.next(this.name);
        };
        this.name = 'auth:failed';
    }
}
exports.default = ConnectedHandler;
//# sourceMappingURL=authFailedHandler.js.map