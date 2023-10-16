declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;
