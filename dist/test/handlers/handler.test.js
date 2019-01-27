"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const proxyquire = require("proxyquire");
const rxjs_1 = require("rxjs");
describe('The Handler class', () => {
    let handler;
    beforeEach(() => {
        const Handler = proxyquire('../../src/handlers/handler', {}).default;
        handler = new Handler();
        handler.name = 'test';
    });
    it('should exist', () => {
        // arrange
        // act
        // assert
        chai_1.expect(handler).to.exist;
    });
    describe('The name member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.name).to.exist;
        });
        it('should be equal to test as it was set in beforeEach', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.name).to.equal('test');
        });
    });
    describe('The subject member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.subject).to.exist;
        });
        it('should be a subject type', () => {
            // arrange
            // act
            // assert
            chai_1.expect(handler.subject instanceof rxjs_1.Subject).to.be.true;
        });
    });
});
//# sourceMappingURL=handler.test.js.map