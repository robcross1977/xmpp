import { expect } from 'chai';
import * as proxyquire from 'proxyquire';
import { Subject } from 'rxjs';

describe('The Handler class', () => {
    let handler: any;

    beforeEach(() => {
        const Handler = proxyquire('../../src/handlers/handler', {}).default;

        handler = new Handler();
        handler.name = 'test';
    });

    it('should exist', () => {
        // arrange
        // act
        // assert
        expect(handler).to.exist;
    });

    describe('The name member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.exist;
        });

        it('should be equal to test as it was set in beforeEach', () => {
            // arrange
            // act
            // assert
            expect(handler.name).to.equal('test');
        });
    });

    describe('The subject member', () => {
        it('should exist', () => {
            // arrange
            // act
            // assert
            expect(handler.subject).to.exist;
        });

        it('should be a subject type', () => {
            // arrange
            // act
            // assert
            expect(handler.subject instanceof Subject).to.be.true;
        });
    });
});
