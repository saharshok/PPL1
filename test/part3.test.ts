import { expect } from "chai";
import { Optional, makeNone, makeSome, bind, isNone, isSome } from "../src/part3/optional";
import { naiveValidateUser, isFailure, monadicValidateUser, makeFailure, makeOk, isOk } from "../src/part3/result";
const div = (x: number, y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(x / y);

const power = (x: number, y: number): Optional<number> =>
    y === 0 && x === 0 ? makeNone() : makeSome(Math.pow(x, y));

const sqrt = (x: number): Optional<number> =>
    x < 0 ? makeNone() : makeSome(Math.sqrt(x));

const isOptionalValue = <T>(x: T): (o: Optional<T>) => boolean =>
    o => isSome(o) && o.value === x;


describe("Assignment 1 Part 3 (Optional)", () => {
    // sqrt(x) / y
    const fTest = (x: Optional<number>, y: Optional<number>): Optional<number> =>
        bind(bind(x, sqrt), xv => bind(y, yv => div(xv, yv)));

    // sqrt(pow(x, y) / z)
    const gTest = (x: Optional<number>, y: Optional<number>, z: Optional<number>): Optional<number> => {
        let vo = bind(x, xv => bind(y, yv => power(xv, yv)));
        vo = bind(vo, v => bind(z, zv => div(v, zv)));
        vo = bind(vo, sqrt);
        return vo;
    }

    const f = (x: number, y: number): Optional<number> =>
        fTest(makeSome(x), makeSome(y));

    const g = (x: number, y: number, z: number): Optional<number> =>
        gTest(makeSome(x), makeSome(y), makeSome(z));

    it("checks fTest returns None<T>", () => {
        expect(f(-5, 6)).to.satisfy(isNone);
        expect(f(9, 0)).to.satisfy(isNone);
        expect(fTest(makeNone(), makeSome(8))).to.satisfy(isNone);
        expect(fTest(makeSome(9), makeNone())).to.satisfy(isNone);
    });

    it("check fTest returns Some<T> value", () => {
        expect(f(36, 3)).to.satisfy(isOptionalValue(2));
        expect(f(9, 1)).to.satisfy(isOptionalValue(3));
    });

    it("checks gTest returns None<T>", () => {
        expect(g(5, 2, 0)).to.satisfy(isNone);
        expect(g(4, 2, -2)).to.satisfy(isNone);
        expect(gTest(makeNone(), makeSome(8), makeSome(4))).to.satisfy(isNone);
        expect(gTest(makeSome(9), makeNone(), makeSome(1))).to.satisfy(isNone);
        expect(gTest(makeSome(9), makeSome(2), makeNone())).to.satisfy(isNone);
    });

    it("checks gTest returns Some<T> value", () => {
        expect(g(5, 2, 4)).to.deep.eq(makeSome(2.5));
        expect(g(3, 3, 3)).to.deep.eq(makeSome(3));
        expect(g(6, 2, 4)).to.deep.eq(makeSome(3));
        expect(g(5, 3, 5)).to.deep.eq(makeSome(5));
    });
});


describe("Assignment 1 Part 3 (Result)", () => {

    interface User {
        name: string;
        email: string;
        handle: string;
    }

    let emptyemail: User = {name : "avi", email:"", handle: "mylife"};
    let emptyename: User = {name : "", email:"ff@gmail.com", handle: "mylife"};
    let emptyehandle: User = {name : "jodi froster", email:"ff@gmail.com", handle: ""};
    let bananas: User = {name : "yosi", email:"bananas.com", handle: "ban ayon"};
    let thinkisTwitter: User = {name : "yosi", email:"ban@ayon", handle: "@"};
    let thinkisBananas: User = {name : "Bananas", email:"basdfasdf", handle: "snajsd"};

    it("checks monadicValidateUser returns Failure on empty", () => {
        expect(monadicValidateUser(emptyemail)).to.satisfy(isFailure);
        expect(monadicValidateUser(emptyemail)).to.deep.eq(makeFailure("Email cannot be empty"));
        expect(monadicValidateUser(emptyename)).to.satisfy(isFailure);
        expect(monadicValidateUser(emptyename)).to.deep.eq(makeFailure("Name cannot be empty"));
        expect(monadicValidateUser(emptyehandle)).to.satisfy(isFailure);
        expect(monadicValidateUser(emptyehandle)).to.deep.eq(makeFailure("Handle cannot be empty"));
    });

    it("checks monadicValidateUser returns Failure when email endsWith bananas.com" , () => {
        expect(monadicValidateUser(bananas)).to.satisfy(isFailure);
        expect(monadicValidateUser(bananas)).to.deep.eq(makeFailure("Domain bananas.com is not allowed"));
    }); 


    it("checks monadicValidateUser returns Failure when handle startsWith @" , () => {
        expect(monadicValidateUser(thinkisTwitter)).to.satisfy(isFailure);
        expect(monadicValidateUser(thinkisTwitter)).to.deep.eq(makeFailure("This isn't Twitter"));
    }); 

    it("checks monadicValidateUser returns Failure when name is Bananas" , () => {
        expect(monadicValidateUser(thinkisBananas)).to.satisfy(isFailure);
        expect(monadicValidateUser(thinkisBananas)).to.deep.eq(makeFailure("Bananas is not a name"));
    }); 


    it("checks monadicValidateUser returns Ok", () => {
        let user: User = {name : "avi", email:"ilikebanan@aa.com", handle: "mylife"};
        expect(monadicValidateUser(user)).to.satisfy(isOk);
        expect(monadicValidateUser(user)).to.deep.eq(makeOk(user));
    });

    it("checks naiveValidateUser returns Failure on empty", () => {
        expect(naiveValidateUser(emptyemail)).to.satisfy(isFailure);
        expect(naiveValidateUser(emptyemail)).to.deep.eq(makeFailure("Email cannot be empty"));
        expect(naiveValidateUser(emptyename)).to.satisfy(isFailure);
        expect(naiveValidateUser(emptyename)).to.deep.eq(makeFailure("Name cannot be empty"));
        expect(naiveValidateUser(emptyehandle)).to.satisfy(isFailure);
        expect(naiveValidateUser(emptyehandle)).to.deep.eq(makeFailure("Handle cannot be empty"));
    });

    it("checks naiveValidateUser returns Failure when email endsWith bananas.com" , () => {
        expect(naiveValidateUser(bananas)).to.satisfy(isFailure);
        expect(naiveValidateUser(bananas)).to.deep.eq(makeFailure("Domain bananas.com is not allowed"));
    });

    it("checks naiveValidateUser returns Failure when handle startsWith @" , () => {
        expect(naiveValidateUser(thinkisTwitter)).to.satisfy(isFailure);
        expect(naiveValidateUser(thinkisTwitter)).to.deep.eq(makeFailure("This isn't Twitter"));
    }); 

    it("checks naiveValidateUser returns Failure when name is Bananas" , () => {
        expect(naiveValidateUser(thinkisBananas)).to.satisfy(isFailure);
        expect(naiveValidateUser(thinkisBananas)).to.deep.eq(makeFailure("Bananas is not a name"));
    }); 

    it("checks naiveValidateUser returns Ok", () => {
        let user: User = {name : "avi", email:"ilikebanan@aa.com", handle: "mylife"};
        expect(naiveValidateUser(user)).to.satisfy(isOk);
        expect(naiveValidateUser(user)).to.deep.eq(makeOk(user));
    });

    expect(monadicValidateUser(emptyemail)).to.satisfy(isFailure);

});
