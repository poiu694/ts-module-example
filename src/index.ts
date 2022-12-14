import { getObjectDeepKeys, getObjectValueByPath } from './utils';

function _(selector: string): Node | null {
  return document.querySelector(selector);
}

declare global {
  interface Node {}
}

module _ {
  export function add<T extends string | number | undefined>(
    augend: Readonly<T>,
    addend: Readonly<T>
  ): T {
    if (augend === undefined && addend === undefined) {
      return <T>'';
    }
    if (augend !== undefined && addend === undefined) {
      return augend;
    }
    if (addend !== undefined && augend === undefined) {
      return addend;
    }
    if (typeof augend === 'string' || typeof addend === 'string') {
      return <T>(String(augend) + String(addend));
    }
    return <T>(Number(augend) + Number(addend));
  }

  export function after<
    T extends unknown[],
    R extends ReturnType<Function['apply']>
  >(
    num: number,
    func: (
      ...args: T
    ) => R extends ReturnType<Function['apply']>
      ? ReturnType<Function['apply']>
      : undefined
  ): (
    ...args: T
  ) => R extends ReturnType<Function['apply']>
    ? ReturnType<Function['apply']>
    : undefined {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }
    num = num || 0;
    return function (...args) {
      if (num < 1) {
        return undefined;
      }
      if (--num < 1) {
        return func.apply(this, args);
      }
    };
  }

  export function at<T extends Object, K extends string | string[]>(
    object: T,
    paths: K
  ): unknown | unknown[] {
    if (typeof paths === 'object') {
      return paths.map((path) => getObjectValueByPath(object, path));
    }
    return getObjectValueByPath(object, paths);
  }

  export function attempt() {}

  export function fetch() {
    return {};
  }

  export function get<T extends Object, K extends string>(
    object: T,
    path: K | K[],
    defaultValue?: unknown
  ) {
    if (object == null) {
      return defaultValue;
    }
    if (typeof path !== 'object') {
      return getObjectValueByPath(object, path) ?? defaultValue;
    }
    const result = path.map((key) =>
      getObjectValueByPath(object, key as string)
    );
    return object == null ? defaultValue : result;
  }

  export function isNull<T extends unknown>(target: T): boolean {
    return target === null;
  }

  export function isNil<T extends unknown>(target: T): boolean {
    return target === null || target === undefined;
  }

  export function isNumber<T extends unknown>(target: T): boolean {
    return typeof target === 'number';
  }

  export function isFunction<T extends unknown>(target: T): boolean {
    return typeof target === 'function';
  }

  export function shuffle<T extends unknown>(target: Array<T>): Array<T> {
    const length = target == null ? 0 : target.length;
    if (!length) {
      return [];
    }

    let index = -1;
    const lastIndex = length - 1;
    const result = [...target];
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
      const value = result[rand];
      result[rand] = result[index];
      result[index] = value;
    }
    return result;
  }

  export function pick() {}

  export function omit() {}

  export function memoize() {}

  export function debounce() {}

  export function throttle() {}

  export function clickOutside() {}
}

export default _;
