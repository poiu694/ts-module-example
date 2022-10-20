export function getObjectValueByPath(obj: Object, path: string) {
  let idx;
  const paths = path.split('.');
  const length = paths.length;

  for (idx = 0; idx < length; idx++) {
    const key = path[idx];
    obj = obj[key as keyof Object];
  }
  return obj;
}
