function _(selector: string): Node | null {
  return document.querySelector(selector);
}

declare global {
  interface Node {}
}

module _ {
  export function add() {}

  export function after() {}

  export function at() {}

  export function attempt() {}

  export function fetch() {
    return {};
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

  export function shuffle<T extends unknown>(target: T[]): T[] {
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
