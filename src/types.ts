export type ArrayType<A extends any[]> = A extends (infer AT)[] ? AT : never;
export type FunctionReturnType<F extends (...args: any[]) => any> = F extends (...args: any[]) => (infer R)[] ? R : never;
export type FunctionArgsType<F extends (...args: any[]) => any> = F extends (...args: [...(infer AT)[]]) => any ? AT : never;