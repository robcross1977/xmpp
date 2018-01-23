import { suite, test, slow, timeout } from 'mocha-typescript';
import { expect } from 'chai';
import * as proxyquire from 'proxyquire';

@suite 
class Xmpp {
    private _xmpp: any;

    before() {
        this._bootstrapModule();
    }

    private _bootstrapModule() {
        const Xmpp = proxyquire('../src/xmpp', {}).default;
        this._xmpp = new Xmpp();
    }

    @test
    shouldExist() {
        // arrange
        // act
        // assert
        expect(this._xmpp).to.exist;
    }

    @test
    shouldExposeClientMember() {
        // arrange
        // act
        // assert
        expect(this._xmpp.client).to.exist;
    }
}
