"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class Handler {
    constructor() {
        this.subject = new rxjs_1.Subject();
        this.name = 'handler';
        this.handler = null;
    }
}
exports.default = Handler;
//# sourceMappingURL=handler.js.map