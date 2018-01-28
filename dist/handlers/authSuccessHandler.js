"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const colors = require("colors");
class ConnectedHandler extends handler_1.default {
    constructor() {
        super();
        this.handler = (data) => {
            console.error(colors.green('#'), colors.green(`-- ${this.name} --`));
            this.subject.next(this.name);
        };
        this.name = 'auth:success';
    }
}
exports.default = ConnectedHandler;
//# sourceMappingURL=authSuccessHandler.js.map