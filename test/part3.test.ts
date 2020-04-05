import { expect } from "chai";
import { Optional, makeNone, makeSome, bind as bindOptional, isNone, isSome } from "../src/part3/optional";
import { Result, makeOk, makeFailure, bind as bindResult, isFailure, isOk } from "../src/part3/result"

describe("Assignment 1 Part 3 (Optional)", () => {
    const div = (x: number, y: number): Optional<number> =>
        y === 0 ? makeNone() : makeSome(x / y);

    const power = (x: number, y: number): Optional<number> =>
        y === 0 && x === 0 ? makeNone() : makeSome(Math.pow(x, y));

    const sqrt = (x: number): Optional<number> =>
        x < 0 ? makeNone() : makeSome(Math.sqrt(x));

    const isOptionalValue = <T>(x: T): (o: Optional<T>) => boolean =>
        o => isSome(o) && o.value === x;

    // sqrt(x) / y
    const fTest = (x: Optional<number>, y: Optional<number>): Optional<number> =>
        bindOptional(bindOptional(x, sqrt), xv => bindOptional(y, yv => div(xv, yv)));

    // sqrt(x^y / z)
    const gTest = (x: Optional<number>, y: Optional<number>, z: Optional<number>): Optional<number> => {
        let vo = bindOptional(x, xv => bindOptional(y, yv => power(xv, yv)));
        vo = bindOptional(vo, v => bindOptional(z, zv => div(v, zv)));
        vo = bindOptional(vo, sqrt);
        return vo;
    }

    const f = (x: number, y: number): Optional<number> =>
        fTest(makeSome(x), makeSome(y));

    const g = (x: number, y: number, z: number): Optional<number> =>
        gTest(makeSome(x), makeSome(y), makeSome(z));

    it("checks fTest returns None", () => {
        expect(f(-5, 6)).to.satisfy(isNone);
        expect(f(9, 0)).to.satisfy(isNone);
        expect(fTest(makeNone(), makeSome(8))).to.satisfy(isNone);
        expect(fTest(makeSome(9), makeNone())).to.satisfy(isNone);
    });

    it("check fTest returns Some<T> value", () => {
        expect(f(36, 3)).to.satisfy(isOptionalValue(2));
        expect(f(9, 1)).to.satisfy(isOptionalValue(3));
    });

    it("checks gTest returns None", () => {
        expect(g(0, 0, 6)).to.satisfy(isNone);
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
    const div = (x: number, y: number): Result<number> =>
        y === 0 ? makeFailure("division by 0") : makeOk(x / y);

    const power = (x: number, y: number): Result<number> =>
        y === 0 && x === 0 ? makeFailure("0 to the power of 0") : makeOk(Math.pow(x, y));

    const sqrt = (x: number): Result<number> =>
        x < 0 ? makeFailure("square root of negative number") : makeOk(Math.sqrt(x));

    const isResultValue = <T>(x: T): (r: Result<T>) => boolean =>
        r => isOk(r) && r.value === x;

    const isFailureMessage = <T>(msg: string): (r: Result<T>) => boolean =>
        r => isFailure(r) && r.massage === msg;

    // sqrt(x) / y
    const fTest = (x: Result<number>, y: Result<number>): Result<number> =>
        bindResult(bindResult(x, sqrt), xv => bindResult(y, yv => div(xv, yv)));

    // sqrt(x^y / z)
    const gTest = (x: Result<number>, y: Result<number>, z: Result<number>): Result<number> => {
        let vo = bindResult(x, xv => bindResult(y, yv => power(xv, yv)));
        vo = bindResult(vo, v => bindResult(z, zv => div(v, zv)));
        vo = bindResult(vo, sqrt);
        return vo;
    }

    const f = (x: number, y: number): Result<number> =>
        fTest(makeOk(x), makeOk(y));

    const g = (x: number, y: number, z: number): Result<number> =>
        gTest(makeOk(x), makeOk(y), makeOk(z));

    it("checks fTest returns Failure", () => {
        expect(f(-5, 6)).to.deep.eq(makeFailure("square root of negative number"));
        expect(f(9, 0)).to.deep.eq(makeFailure("division by 0"));
        expect(fTest(makeFailure("blah"), makeOk(8))).to.deep.eq(makeFailure("blah"));
        expect(fTest(makeOk(9), makeFailure("test"))).to.deep.eq(makeFailure("test"));
    });

    it("check fTest returns Some<T> value", () => {
        expect(f(36, 3)).to.deep.eq(makeOk(2));
        expect(f(9, 1)).to.deep.eq(makeOk(3));
    });

    it("checks gTest returns None<T>", () => {
        expect(g(0, 0, 6)).to.deep.eq(makeFailure("0 to the power of 0"));
        expect(g(5, 2, 0)).to.deep.eq(makeFailure("division by 0"));
        expect(g(4, 2, -2)).to.deep.eq(makeFailure("square root of negative number"));
        expect(gTest(makeFailure("test2"), makeOk(8), makeOk(4))).to.deep.eq(makeFailure("test2"));
        expect(gTest(makeOk(9), makeFailure("hello"), makeOk(1))).to.deep.eq(makeFailure("hello"));
        expect(gTest(makeOk(9), makeOk(2), makeFailure("hi there"))).to.deep.eq(makeFailure("hi there"));
    });

    it("checks gTest returns Some<T> value", () => {
        expect(g(5, 2, 4)).to.deep.eq(makeOk(2.5));
        expect(g(3, 3, 3)).to.deep.eq(makeOk(3));
        expect(g(6, 2, 4)).to.deep.eq(makeOk(3));
        expect(g(5, 3, 5)).to.deep.eq(makeOk(5));
    });
});