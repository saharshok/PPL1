import { reduce } from "ramda";

/* Question 3 */
interface Ok<T> {
    tag: "Ok";
    value: T;
}

interface Failure {
    tag: "Failure";
    massage: string;
}

export type Result<T> = Ok<T> | Failure;

export const makeOk: <T>(value: T) => Result<T> = <T>(value: T): Result<T> => ({tag: "Ok",value: value});

export const isOk: <T>(x: Result<T>) => x is Ok<T> = <T>(x: Result<T>): x is Ok<T> => x.tag === "Ok";

export const makeFailure: <T>(massage: string) => Result<T> = <T>(massage: string): Result<T> => ({tag: "Failure",massage: massage});

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
<<<<<<< HEAD
    = (user : User) : Result<User> => {
        let nameResult: Result<User>;
        let emailResult: Result<User>;
        let hanldeResult: Result<User>;
        return (nameResult = validateName(user)) && isOk(nameResult) ?
            (emailResult = validateEmail(user)) && isOk(emailResult) ?
            (hanldeResult = validateHandle(user)) && isOk(hanldeResult) ?
            hanldeResult : hanldeResult : emailResult : nameResult;
    }
=======
    = (user: User) : Result<User> => {
    let nameResult: Result<User>;
    let emailResult: Result<User>;
    let hanldeResult: Result<User>;
    return (nameResult = validateName(user)) && isOk(nameResult) ?
        (emailResult = validateEmail(user)) && isOk(emailResult) ?
        (hanldeResult = validateHandle(user)) && isOk(hanldeResult) ?
        hanldeResult : hanldeResult : emailResult : nameResult;
}
>>>>>>> 37f5cf0eb399322b8e39bb42d2ee2c0eb204825c

export const monadicValidateUser: (user: User) => Result<User> = (user: User): Result<User> =>
    reduce(bind, makeOk(user), [validateName, validateEmail, validateHandle])