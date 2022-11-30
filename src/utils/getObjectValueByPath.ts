export function getObjectValueByPath(obj: Object, path: string) {
  let idx;
  const paths = path.split('.');
  const length = paths.length;

  for (idx = 0; idx < length; idx++) {
    const key = paths[idx] as keyof typeof obj;
    if (key != null && obj[key] != undefined) {
      obj = obj[key];
    } else {
      return null;
    }
  }
  return obj;
}
