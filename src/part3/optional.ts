/* Question 1 */

interface Some<T> {
    tag: "Some";
    value: T;
}

interface None {
    tag: "None";
}

export type Optional<T> = Some<T> | None;

export const makeSome: <T>(value: T) => Some<T> = <T>(value: T): Some<T> => ({tag: "Some",value: value});

export const makeNone: () => None = (): None => ({tag: "None"});

export const isSome: <T>(x: Optional<T>) => x is Some<T> = <T>(x: Optional<T>): x is Some<T> => x.tag === "Some";

export const isNone: <T>(x: Optional<T>) => x is None = <T>(x: Optional<T>): x is None => x.tag === "None";

/* Question 2 */
export const bind: <T, U>(optional: Optional<T>, f: (x: T) => Optional<U>) => Optional<U>
    = <T,U>(optional: Optional<T>, f: (x: T) => Optional<U>): Optional<U> =>
    isSome(optional) ? f(optional.value) : makeNone();
