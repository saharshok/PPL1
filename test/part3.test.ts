import { expect } from "chai";
import { Optional, makeNone, makeSome, bind, isNone, isSome } from "../src/part3/optional";

const div = (x: number, y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(x / y);

const power = (x: number, y: number): Optional<number> =>
    y === 0 && x === 0 ? makeNone() : makeSome(Math.pow(x, y));

const sqrt = (x: number): Optional<number> =>
    x < 0 ? makeNone() : makeSome(Math.sqrt(x));

const isOptionalValue = <T>(x: T): (o: Optional<T>) => boolean =>
    o => isSome(o) && o.value === x;

import "../src/part3/optional"

describe("Assignment 1 Part 3", () => {
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