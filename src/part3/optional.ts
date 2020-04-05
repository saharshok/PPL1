/* Question 1 */

import { values } from "ramda";

interface Some<T> {
    tag: "Some";
    value: T;
}

interface None<T> {
    tag: "None";
}

export type Optional<T> = Some<T> | None<T>;

export const makeSome: <T>(value: T) => Some<T> = <T>(value: T): Some<T> => ({tag: "Some",value: value});

export const makeNone: <T>() => None<T> =  <T>(): None<T> => ({tag: "None"});

export const isSome: <T>(x: Optional<T>) => x is Some<T> = <T>(x: Optional<T>): x is Some<T> => x.tag === "Some";

export const isNone: <T>(x: Optional<T>) => x is None<T> =  <T>(x: Optional<T>): x is None<T> => x.tag === "None";

/* Question 2 */

export const bind: <T, U>(optional: Optional<T>, f: (x: T) => Optional<U>) => Optional<U> 
    = <T,U>(optional: Optional<T>, f: (x: T) => Optional<U>): Optional<U> => {
    return isSome(optional) ? f(optional.value) : makeNone();
};



export const naiveValidateUser: (user : User) => Result<User>  
    = (user : User) : Result<User> => {
    const validatename = validateName(user);
    const validateemail = validateEmail(user);
    const validatehandle = validateName(user);
    return isOk(validatename) ? isOk(validateemail) ? validatehandle : validateemail : validatename;
    }