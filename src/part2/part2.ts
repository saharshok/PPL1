import { reduce, map, identity, max, filter, any } from "ramda";

/* Question 1 */
export const partition: <T>(predicate: (x: T) => boolean, array: T[]) => T[][] /*function type*/
 = <T>(predicate: (x: T) => boolean, array: T[]): T[][] /*return value T[][]*/ =>
    reduce(
        (acc: T[][], elem: T) =>
            predicate(elem) ?
                [acc[0].concat([elem]), acc[1]] :
                [acc[0], acc[1].concat([elem])],
        [[], []],
        array,
    );


/* Question 2 */
export const mapMat: <T1, T2>(f: (x: T1) => T2, mat: T1[][]) => T2[][] /*function type */
= <T1, T2>(f: (x: T1) => T2, mat: T1[][]): T2[][] /*return value T2 and not T1 so we can return diffrent type from the one we got*/ =>
    map((row: T1[]) => map(f, row), mat);

// recudeLeft: acc(cur(x)), identity  ==> identity(f1(x)) => f1(f2(x)) => ... => (f1(f2(f...(f_n-1))))(f_n(x))
// reduceLeft: cur(acc(x)), identity  ==> f1(identity(x)) => f2(f1(x)) => ... => f_n(f_n-1(...(f1(x))))
// reduceRight: acc(cur(x)), identity ==> identity(fn(x)) => fn(f_n-1(x)) => (fn(f_n-1(x)))(f_n-2(x)) => ... => f_n(f_n-1(...f1(x)))
// reduceRight: cur(acc(X)), identity ==> fn(identity(x)) => f_n-1(f_n(x)) => ... => (f1(f2(f...(f_n-1))))(f_n(x))

/* Question 3 */
export const composeMany: <T>(f: ((x: T) => T)[]) => (x: T) => T /*function type */
 = <T>(f: ((x: T) => T)[]): (x: T) => T /*return value (function F(T) -> T )*/  =>
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

export const maxSpeed: (pokemons: Pokemon[]) => Pokemon[] /*function type */
= (pokemons: Pokemon[]): Pokemon[] /*return value Pokemon[])*/ => {
    // we assume that for every pokemon p, p.base.Speed > 0
    let s: number = reduce((acc: number, p: Pokemon) => max(p.base.Speed, acc), 0, pokemons);
    return filter((p: Pokemon) => p.base.Speed === s, pokemons);
};

export const grassTypes: (pokemons: Pokemon[]) => string[] /*function type */
= (pokemons: Pokemon[]): string[]  /*return value string[] (names of grass pokemons)*/=> {
    let grassPokemonNames: string[] = map(
        (p: Pokemon) => p.name.english,
        filter(
            (p: Pokemon) => any((t: string) => t === "Grass", p.type),
            pokemons
        )
    );
    grassPokemonNames.sort();
    return grassPokemonNames;
};

export const uniqueTypes: (pokemons: Pokemon[]) => string[]
= (pokemons: Pokemon[]): string[] /*return value string[] (names of all pokemons types)*/ => {
    let types: string[] = reduce(
        (acc: string[], p: Pokemon) =>
            acc.concat(
                filter(
                    (type: string) => !any((curType: string) => type === curType, acc),
                    p.type
                )
            ),
        [],
        pokemons
    );
    types.sort();
    return types;
};





// function t(pokemons: Pokemon[]): string[] {
//     let types: string[] = reduce(
//         (acc: string[], p: Pokemon) =>
//             acc.concat(
//                 reduce(
//                     (pacc: string[], type: string) =>
//                         pacc.concat(
//                             any((curType: string) => type === curType, acc) ?
//                                 [] :
//                                 [type]
//                         ),
//                     [],
//                     p.type
//                 )
//             ),
//         [],
//         pokemons
//     );
// }
