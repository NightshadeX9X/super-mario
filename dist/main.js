import * as Lib from '../../Lib/client/Lib.js';
import Loader from './Loader.js';
import { promiseEvery } from './Util.js';
let loader = new Loader();
let progressBar = document.getElementById('loadingBar');
let promises = [
    loader.image('https://media.geeksforgeeks.org/wp-content/uploads/20190719161521/core.jpg'),
];
progressBar.setAttribute('max', `${promises.length}`);
(async function () {
    await promiseEvery(promises, loaded => { progressBar.value++; console.log("Loaded:", loaded); });
    await loader.text('');
    console.log("All done");
    let cnv = document.createElement('canvas');
    let ctx = cnv.getContext('2d');
    document.body.innerHTML = "";
    document.body.appendChild(cnv);
})();
export { Lib };
