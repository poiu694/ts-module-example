import { getObjectDeepKeys } from '../src/utils';

type Simple1 = { a: number; b: number };
type Simple2 = number[];
type Complex1 = { a: number; b: number; c: number[] };
type Complex2 = (number | { a: number; b: number })[];
type Complex3 = (
  | number
  | { a: number; b: number; d: (number | { a: number; b: number })[] }
)[];

describe('getObjectDeepKey', () => {
  let simple1: Simple1, simple2: Simple2;
  let complex1: Complex1, complex2: Complex2, complex3: Complex3;

  beforeEach(() => {
    simple1 = { a: 1, b: 2 }; // Object
    simple2 = [1, 2, 3]; // Array
    complex1 = { a: 1, b: 2, c: [1, 2, 3] };
    complex2 = [1, 2, { a: 1, b: 2 }];
    complex3 = [1, 2, { a: 1, b: 2, d: [1, 2, { a: 1, b: 1 }] }];
  });

  it('simple case#1, 단순 depth1 Object', () => {
    const key = getObjectDeepKeys(simple1);
    expect(key).toStrictEqual(['a', 'b']);
  });

  it('simple case#2, 단순 depth1 Array', () => {
    const key = getObjectDeepKeys(simple2);
    expect(key).toStrictEqual(['0', '1', '2']);
  });

  it('complex case#1, Object 내부 Array', () => {
    const key = getObjectDeepKeys(complex1);
    expect(key).toStrictEqual(['a', 'b', 'c', 'c[0]', 'c[1]', 'c[2]']);
  });

  it('complex case#2, Array 내부 Object', () => {
    const key = getObjectDeepKeys(complex2);
    expect(key).toStrictEqual(['0', '1', '2', '2.a', '2.b']);
  });

  it('complex case#3, mixed case', () => {
    const key = getObjectDeepKeys(complex3);
    expect(key).toStrictEqual([
      '0',
      '1',
      '2',
      '2.a',
      '2.b',
      '2.d',
      '2.d[0]',
      '2.d[1]',
      '2.d[2]',
      '2.d[2].a',
      '2.d[2]',
      '2.d[2].b',
    ]);
  });
});
