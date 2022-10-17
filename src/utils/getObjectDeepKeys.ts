/**
 * getObjectDeepKeys는 한 object에서 depth와 상관없이 모든 key를 가져온다.
 *
 * 이때, depth가 늘어나면 '.'으로 구분한다. 자세한 것은 example을 참조한다.
 *
 * @param obj key를 파악할 object
 *
 * @example
 * ```ts
 * const object = { a: 1, b: [c: 3]};
 * const keys = getObjectDeepKeys(object);
 * console.log(keys); // ['a', 'b', 'b[0].c']
 * ```
 * */
export function getObjectDeepKeys(obj: Object): string[] {
  return Object.keys(obj)
    .filter((key) => obj[key as keyof typeof obj] instanceof Object)
    .map((key) => {
      const subObject = obj[key as keyof Object];
      // 배열인 경우에는 "[인덱스]" 를 prefix에 붙여준다.
      if (Array.isArray(subObject)) {
        return subObject
          .map((subObj, idx) =>
            typeof subObj === 'object'
              ? getObjectDeepKeys(subObj)
                  .map((subKey) => [
                    `${key}[${idx}]`,
                    `${key}[${idx}].${subKey}`,
                  ])
                  .flat()
              : `${key}[${idx}]`
          )
          .flat();
      }
      // 배열이 아닌 object라면 "." 만 prefix로 붙여준다.
      return getObjectDeepKeys(subObject).map((subKey) => `${key}.${subKey}`);
    })
    .reduce((acc, deepKey) => acc.concat(deepKey), Object.keys(obj));
}
