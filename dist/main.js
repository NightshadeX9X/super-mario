import * as Lib from '../../Lib/client/Lib.js';
import Loader from './Loader.js';
import { promiseEvery } from './Util.js';
import createCanvas from './createCanvas.js';
import Vector from './Vector.js';
let loader = new Loader();
loader.paths.add('image', 'images/');
let progressBar = document.getElementById('loadingBar');
let promises = [
    loader.image('tileset.png'),
];
progressBar.setAttribute('max', `${promises.length}`);
(async function () {
    let [image] = await promiseEvery(promises, loaded => { progressBar.value++; console.log("Loaded:", loaded); });
    console.log("All necessary assets loaded.");
    let { cnv, ctx } = createCanvas(new Vector(480, 240));
    ctx.drawImage(image, 0, 0, 16, 16, 0, 0, 16, 16);
})();
export { Lib };
