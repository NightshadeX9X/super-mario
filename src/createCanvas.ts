import Vector from "./Vector";

export default function createCanvas(size: Vector, clearBody = false, append = false) {
    let cnv = document.createElement('canvas');
    cnv.width = size.x;
    cnv.height = size.y;
    let ctx = <CanvasRenderingContext2D>cnv.getContext('2d');
    if (clearBody) document.body.innerHTML = "";
    if (append) document.body.appendChild(cnv);
    return { cnv, ctx }
}