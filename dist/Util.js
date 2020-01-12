/**
 *
 * @param promises Array of promises
 *
 
 * Takes the array of promises, and immediately each one is assigned to a function.
 *
 
 * 1st promise gets first function, 2nd promise gets second function etc. If the number of promises is greater, the remaining promises all use the last function provided.
 *

 * Whenever a promise resolves, its corresponding function is executed with the resolve value.
 */
export function promiseEvery(promises, ...fns) {
    return new Promise(res => {
        let vals = [];
        promises.forEach((promise, i) => {
            let fn = fns[i < fns.length ? i : fns.length - 1] || ((val) => { });
            promise.then(val => { fn(val); vals.push(val); if (vals.length >= promises.length)
                res(vals); });
        });
    });
}
export async function handleImport(path) {
    return Promise.resolve((await import(path)));
}
