import { Collection } from "../../Lib/client/Lib.js";
import Vector from "./Vector.js";
import createCanvas from "./createCanvas.js";
export default class Spritesheet {
    constructor(image, size) {
        this.image = image;
        this.size = size;
        this.buffers = new Collection();
    }
    register(name, spos, adj = new Vector(1)) {
        console.log("img:", this.image);
        let { cnv: buffer, ctx } = createCanvas(this.size);
        ctx.drawImage(this.image, spos.x, spos.y, this.size.x * adj.x, this.size.y * adj.y, 0, 0, this.size.x * adj.x, this.size.y * adj.y);
        this.buffers.set(name, buffer);
    }
    draw(name, ctx, dpos, adj = new Vector(1)) {
        let buffer = this.buffers.get(name);
        if (buffer) {
            ctx.drawImage(buffer, dpos.x, dpos.y, this.size.x * adj.x, this.size.y * adj.y);
        }
    }
    registerSprite(name, spos, adj = new Vector(1)) {
        this.register(name, Vector.prod(spos, this.size), adj);
    }
    drawSprite(name, ctx, dpos, adj = new Vector(1)) {
        this.draw(name, ctx, Vector.prod(dpos, this.size), adj);
    }
}
