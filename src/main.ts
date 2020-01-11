(async function () {

    await promiseEvery([delay(2000), delay(2100)], console.log);
    let cnv = document.createElement('canvas');
    let ctx = <CanvasRenderingContext2D>cnv.getContext('2d');
    document.body.innerHTML = "";
    document.body.appendChild(cnv);
})()


function delay(ms: number): Promise<number> {
    return new Promise(res => setTimeout(res, ms, ms));
}

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
async function promiseEvery<T>(promises: Promise<T>[], ...fns: ((val: T) => void)[]) {
    let vals: T[] = [];
    promises.forEach((promise, i) => {
        let fn = fns[i < fns.length ? i : fns.length - 1] || ((val: T) => { });
        promise.then(val => { fn(val); vals.push(val) });
    });
    return vals;

}