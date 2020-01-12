export default class Vector {
    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x += x;
        this.y += y;
        return this;
    }
    sub(other) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x -= x;
        this.y -= y;
        return this;
    }
    mult(other) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x *= x;
        this.y *= y;
        return this;
    }
    div(other) {
        let { x, y } = other instanceof Vector ? other : { x: other, y: other };
        this.x /= x;
        this.y /= y;
        return this;
    }
    static getDistance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    }
    static sum(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    }
    static diff(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    }
    static prod(a, b) {
        return new Vector(a.x * b.x, a.y * b.y);
    }
    static quo(a, b) {
        return new Vector(a.x / b.x, a.y / b.y);
    }
    arr() {
        return [this.x, this.y];
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
