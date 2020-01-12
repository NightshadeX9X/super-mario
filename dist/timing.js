export function delay(ms) {
    return new Promise(res => setTimeout(res, ms, ms));
}
export function time(fn) {
    let before = Date.now();
    fn();
    let after = Date.now();
    return after - before;
}
