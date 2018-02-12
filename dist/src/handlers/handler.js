"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("rxjs/Subject");
class Handler {
    constructor() {
        this.subject = new Subject_1.Subject();
        this.name = 'handler';
        this.handler = null;
    }
}
exports.default = Handler;
//# sourceMappingURL=handler.js.map