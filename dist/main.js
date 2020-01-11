"use strict";
let progressBar = document.getElementById('loadingBar');
let promises = [delay(2000), delay(20200), delay(8000), delay(2600), delay(200), delay(4000), delay(1900)];
progressBar.setAttribute('max', `${promises.length}`);
(async function () {
    await promiseEvery(promises, Ö => { progressBar.value++; console.log(Ö); });
    console.log("All done");
    let cnv = document.createElement('canvas');
    let ctx = cnv.getContext('2d');
    document.body.innerHTML = "";
    document.body.appendChild(cnv);
})();
function delay(ms) {
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
function promiseEvery(promises, ...fns) {
    return new Promise(res => {
        let vals = [];
        promises.forEach((promise, i) => {
            let fn = fns[i < fns.length ? i : fns.length - 1] || ((val) => { });
            promise.then(val => { fn(val); vals.push(val); if (vals.length === promises.length - 1)
                res(vals); });
        });
    });
}
