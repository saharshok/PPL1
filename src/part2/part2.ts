import { reduce, map, identity, reduceRight, curry } from "ramda";

/* Question 1 */
export const partition: <T>(predicate: (x: T) => boolean, array: T[]) => T[][] =
<T>(predicate: (x: T) => boolean, array: T[]) =>
    reduce(
        (acc: T[][], elem: T) =>
            predicate(elem) ?
                [acc[0].concat([elem]), acc[1]] :
                [acc[0], acc[1].concat([elem])],
        [[], []],
        array,
    );


/* Question 2 */
export const mapMat: <T1, T2>(f: (x: T1) => T2, mat: T1[][]) => T2[][] =
<T1, T2>(f: (x: T1) => T2, mat: T1[][]) =>
    map((row: T1[]) => map(f, row), mat);

function name<T>(f1: (x: T)=>T, f2: (x: T)=>T): (x: T) => T {
    return x => f1(f2(x));
}

// recudeLeft: acc(cur(x)), identity  ==> identity(f1(x)) => f1(f2(x)) => ... => (f1(f2(f...(f_n-1))))(f_n(x))
// reduceLeft: cur(acc(x)), identity  ==> f1(identity(x)) => f2(f1(x)) => ... => f_n(f_n-1(...(f1(x))))
// reduceRight: acc(cur(x)), identity ==> identity(fn(x)) => fn(f_n-1(x)) => (fn(f_n-1(x)))(f_n-2(x)) => ... => f_n(f_n-1(...f1(x)))
// reduceRight: cur(acc(X)), identity ==> fn(identity(x)) => f_n-1(f_n(x)) => ... => (f1(f2(f...(f_n-1))))(f_n(x))

/* Question 3 */
export const composeMany: <T>(f: ((x: T) => T)[]) => (x: T) => T =
<T>(f: ((x: T) => T)[]) =>
    reduce(
        (acc: (x: T) => T, cur: (x: T) => T) =>
            x => acc(cur(x)),
        identity,
        f
    );

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed = undefined;

export const grassTypes = undefined;

export const uniqueTypes = undefined;
