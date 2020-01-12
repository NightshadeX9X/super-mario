import * as Lib from '../../Lib/client/Lib.js';
import Loader from './Loader.js';
import { promiseEvery } from './Util.js';

let loader = new Loader();
loader.paths.add('image', 'images/')
let progressBar = <HTMLProgressElement>document.getElementById('loadingBar');
let promises: Promise<HTMLImageElement>[] =
    [
        loader.image('tileset.png'),
    ];
progressBar.setAttribute('max', `${promises.length}`);

(async function () {
    await promiseEvery(promises, loaded => { progressBar.value++; console.log("Loaded:", loaded) });






    console.log("All done")
    let cnv = document.createElement('canvas');
    let ctx = <CanvasRenderingContext2D>cnv.getContext('2d');
    document.body.innerHTML = "";
    document.body.appendChild(cnv);
})()

export { Lib };
