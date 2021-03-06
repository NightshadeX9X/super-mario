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
export function promiseEvery<T>(promises: Promise<T>[], ...fns: ((val: T) => void)[]): Promise<T[]> {
    return new Promise(res => {

        let vals: T[] = [];

        let countDone = 0;
        promises.forEach((promise, i) => {
            let fn = fns[i < fns.length ? i : fns.length - 1] || ((val: T) => { });
            promise.then(val => {
                fn(val);
                vals[i] = val;
                countDone++;
                if (countDone >= promises.length) res(vals);
            });
        });
    })

}
type Module = typeof import('./main')
export async function handleImport(path: string) {
    let mod = await import(path);
    console.log("mod", mod)
    return mod;
}