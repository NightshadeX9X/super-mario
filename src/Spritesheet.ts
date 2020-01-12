import { Collection } from "../../Lib/client/Lib.js";
import Vector from "./Vector.js";
import createCanvas from "./createCanvas.js";

export default class Spritesheet {
    buffers = new Collection<string, HTMLCanvasElement>();
    constructor(private image: HTMLImageElement, private size: Vector) { }
    register(name: string, spos: Vector, adj = new Vector(1)) {
        let { cnv: buffer, ctx } = createCanvas(this.size);
        ctx.drawImage(this.image, spos.x, spos.y, this.size.x * adj.x, this.size.y * adj.y, 0, 0, this.size.x * adj.x, this.size.y * adj.y);
        this.buffers.set(name, buffer)
    }
    draw(name: string, ctx: CanvasRenderingContext2D, dpos: Vector, adj = new Vector(1)) {
        let buffer = this.buffers.get(name);
        if (buffer) {
            ctx.drawImage(buffer, dpos.x, dpos.y, this.size.x * adj.x, this.size.y * adj.y)
        }
    }

    registerSprite(name: string, spos: Vector, adj = new Vector(1)) {
        this.register(name, Vector.prod(spos, this.size), adj)
    }
    drawSprite(name: string, ctx: CanvasRenderingContext2D, dpos: Vector, adj = new Vector(1)) {
        this.draw(name, ctx, Vector.prod(dpos, this.size), adj)
    }
}