export default class Vector {
    constructor(public x: number = 0, public y: number = x) { }

    add(other: number | Vector) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x += x;
        this.y += y;
        return this;
    }
    sub(other: number | Vector) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x -= x;
        this.y -= y;
        return this;
    }
    mult(other: number | Vector) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x *= x;
        this.y *= y;
        return this;
    }
    div(other: number | Vector) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x /= x;
        this.y /= y;
        return this;
    }

    static getDistance(v1: Vector, v2: Vector) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y))
    }

    static sum(a: Vector, b: Vector) {
        return new Vector(a.x + b.x, a.y + b.y)
    }
    static diff(a: Vector, b: Vector) {
        return new Vector(a.x - b.x, a.y - b.y)
    }
    static prod(a: Vector, b: Vector) {
        return new Vector(a.x * b.x, a.y * b.y)
    }
    static quo(a: Vector, b: Vector) {
        return new Vector(a.x / b.x, a.y / b.y)
    }

    arr(): [number, number] {
        return [this.x, this.y]
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;

    }
}