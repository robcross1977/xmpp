import { suite, test, slow, timeout } from 'mocha-typescript';
import { expect } from 'chai';
import * as proxyquire from 'proxyquire';
import { EventEmitter } from 'events';

@suite 
class Client {
    private _client: any;

    before() {
        this._bootstrapModule();
    }

    private _bootstrapModule() {
        const Client = proxyquire('../src/client', {}).default;
        this._client = new Client();
    }

    @test
    shouldExist() {
        // arrange
        // act
        // assert
        expect(this._client).to.exist;
    }

    @test
    shouldBeAnEventEmitter() {
        // arrange
        // act
        // assert
        expect(this._client instanceof EventEmitter).to.be.true;
    }
}
