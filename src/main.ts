let progressBar = <HTMLProgressElement>document.getElementById('loadingBar');
let promises = [delay(2000), delay(20200), delay(8000), delay(2600), delay(200), delay(4000), delay(1900)];
progressBar.setAttribute('max', `${promises.length}`);
(async function () {
    await promiseEvery(promises, Ö => { progressBar.value++; console.log(Ö) });
    console.log("All done")
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
function promiseEvery<T>(promises: Promise<T>[], ...fns: ((val: T) => void)[]): Promise<T[]> {
    return new Promise(res => {

        let vals: T[] = [];
        promises.forEach((promise, i) => {
            let fn = fns[i < fns.length ? i : fns.length - 1] || ((val: T) => { });
            promise.then(val => { fn(val); vals.push(val); if (vals.length === promises.length - 1) res(vals); });
        });
    })

}

type ArrayType<A extends any[]> = A extends (infer AT)[] ? AT : never;
type FunctionReturnType<F extends (...args: any[]) => any> = F extends (...args: any[]) => (infer R)[] ? R : never;
type FunctionArgsType<F extends (...args: any[]) => any> = F extends (...args: [...(infer AT)[]]) => any ? AT : never;
