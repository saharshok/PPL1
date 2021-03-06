import { reduce } from "ramda";

/* Question 3 */
interface Ok<T> {
    tag: "Ok";
    value: T;
}

interface Failure {
    tag: "Failure";
    message: string;
}

export type Result<T> = Ok<T> | Failure;

export const makeOk: <T>(value: T) => Ok<T> = <T>(value: T): Ok<T> => ({tag: "Ok",value: value});

export const isOk: <T>(x: Result<T>) => x is Ok<T> = <T>(x: Result<T>): x is Ok<T> => x.tag === "Ok";

export const makeFailure: (message: string) => Failure = (message: string): Failure => ({tag: "Failure",message: message});

export const isFailure: <T>(x: Result<T>) => x is Failure = <T>(x: Result<T>): x is Failure => x.tag === "Failure";

/* Question 4 */
export const bind: <T, U>(result: Result<T>, f: (x: T) => Result<U>) => Result<U>
    = <T,U>(result: Result<T>, f: (x: T) => Result<U>): Result<U> =>
    isOk(result) ? f(result.value) : result;

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

export const naiveValidateUser: (user : User) => Result<User>
    = (user: User) : Result<User> => {
    let nameResult: Result<User>;
    let emailResult: Result<User>;
    let hanldeResult: Result<User>;
    return (nameResult = validateName(user)) && isOk(nameResult) ?
        (emailResult = validateEmail(user)) && isOk(emailResult) ?
        (hanldeResult = validateHandle(user)) && isOk(hanldeResult) ?
        hanldeResult : hanldeResult : emailResult : nameResult;
}

export const monadicValidateUser: (user: User) => Result<User> = (user: User): Result<User> =>
    reduce<(x: User) => Result<User>, Result<User>>(bind, makeOk(user), [validateName, validateEmail, validateHandle])