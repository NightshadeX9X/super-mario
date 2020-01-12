export function delay(ms: number): Promise<number> {
    return new Promise(res => setTimeout(res, ms, ms));
}
export function time(fn: Function): number {
    let before = Date.now();
    fn();
    let after = Date.now();

    return after - before;
}