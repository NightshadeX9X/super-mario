import * as Lib from '../../Lib/client/Lib.js';
import Loader from './Loader.js';
import { promiseEvery, handleImport } from './Util.js';
import createCanvas from './createCanvas.js';
import Vector from './Vector.js';
import Spritesheet from './Spritesheet.js';
let loader = new Loader();
loader.paths.add('image', 'images/');
let progressBar = document.getElementById('loadingBar');
async function loadBackgroundSprites() {
    let image = await loader.image('tileset.png');
    let backgroundSprites = new Spritesheet(image, new Vector(16));
    backgroundSprites.registerSprite('ground', new Vector());
    backgroundSprites.registerSprite('sky', new Vector(3, 23));
}
(async function () {
    let promises = [
        handleImport('./levels/1-1.js'),
        loadBackgroundSprites()
    ];
    progressBar.setAttribute('max', `${promises.length}`);
    let [level_import, backgroundSprites] = await promiseEvery(promises, loaded => { progressBar.value++; console.log("Loaded:", loaded); });
    let level = level_import.default;
    console.log("All necessary assets loaded.");
    let { cnv, ctx } = createCanvas(new Vector(480, 240), true, true);
    level.backgrounds.forEach(bg => {
        for (let y = bg.ranges[0]; y < bg.ranges[1]; y++) {
            for (let x = bg.ranges[2]; x < bg.ranges[3]; x++) {
                backgroundSprites.drawSprite(bg.tile, ctx, new Vector(y, x));
            }
        }
    });
})();
export { Lib };
