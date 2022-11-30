import _ from '../src';
import { getObjectDeepKeys } from '../src/utils';

describe('_.add', () => {
  it('add function이 모듈에 들어있다.', () => {
    expect(typeof _.add).toBe('function');
  });

  it('두 개의 숫자형 자료를 더하면 더한 숫자가 나온다.', () => {
    expect(_.add(1, 2)).toStrictEqual(3);
  });

  it('두 개의 문자열 자료를 더하면 더한 문자열이 나온다.', () => {
    expect(_.add('1', '2')).toStrictEqual('12');
  });

  it('두 매개변수 중 한 개라도 문자열 자료를 더하면 더한 문자열가 나온다.', () => {
    expect(_.add<string | number>('1', 2)).toStrictEqual('12');
    expect(_.add<string | number>(1, '2')).toStrictEqual('12');
  });

  it('두 매개변수 중 한 개만 undefined를 더하면 undefined가 아닌 다른 매개변수 나온다.', () => {
    expect(_.add(undefined, 2)).toStrictEqual(2);
    expect(_.add(1, undefined)).toStrictEqual(1);
  });

  it('두 매개변수 모두 undefined를 더하면 빈 문자열이 나온다.', () => {
    expect(_.add(undefined, undefined)).toStrictEqual('');
  });
});

describe('_.after', () => {
  it('after function이 모듈에 들어있다.', () => {
    expect(typeof _.after).toBe('function');
  });

  it('after(1, () => hi) 를 정상적으로 바로 반환한다.', () => {
    const test = _.after(1, () => 'hi');
    expect(test()).toBe('hi');
  });

  it('after(3, () => "hi") 3번째에만 정상적으로 실행된다.', () => {
    const test = _.after([1, 2, 3].length, () => 'hi');
    expect(test()).toBe(undefined);
    expect(test()).toBe(undefined);
    expect(test()).toStrictEqual('hi');
    expect(test()).toStrictEqual(undefined);
  });

  it('after(0, () => hi) 는 횟수가 없어 after를 판단하기 어려우므로 undefined를 리턴한다.', () => {
    const test = _.after(0, () => 'hi');
    expect(test()).toBe(undefined);
  });

  it('after(-1, () => hi) 는 음수이므로 after를 판단하기 어려우므로 undefined를 리턴한다.', () => {
    const test = _.after(-1, () => 'hi');
    expect(test()).toBe(undefined);
  });
});

describe('_.get', () => {
  type Object1 = {
    b: number;
    c: ({ d: number } | number)[];
    d: {
      f: number;
      k: (number | { g: number })[];
    };
  };
  let object = <Object1>{};
  beforeEach(() => {
    object = {
      b: 3,
      c: [{ d: 2 }, 2],
      d: { f: 1, k: [3, 4, 5, { g: 1 }, { g: 2 }] },
    };
  });

  it('get function이 모듈에 들어있다.', () => {
    expect(typeof _.get).toBe('function');
  });

  it('get(obj, key)에서 정상적인 key일때 잘 작동한다.', () => {
    const b = _.get(object, 'b');
    expect(b).toStrictEqual(3);
  });

  it('get(obj, key)에서 정상적인 모든 key가 잘 작동한다.', () => {
    // const keys = getObjectDeepKeys(object); //  전체 키  확인
    // const result = _.get(object, keys); // 전체 value 확인

    expect(_.get(object, 'b')).toStrictEqual(3);
    expect(_.get(object, 'c')).toStrictEqual([{ d: 2 }, 2]);
    expect(_.get(object, 'd')).toStrictEqual({
      f: 1,
      k: [3, 4, 5, { g: 1 }, { g: 2 }],
    });
    expect(_.get(object, 'c.0')).toStrictEqual({ d: 2 });
    expect(_.get(object, 'c.0.d')).toStrictEqual(2);
    expect(_.get(object, 'c.1')).toStrictEqual(2);
    expect(_.get(object, 'd.f')).toStrictEqual(1);
    expect(_.get(object, 'd.k')).toStrictEqual([3, 4, 5, { g: 1 }, { g: 2 }]);
    expect(_.get(object, 'd.k.0')).toStrictEqual(3);
    expect(_.get(object, 'd.k.1')).toStrictEqual(4);
    expect(_.get(object, 'd.k.2')).toStrictEqual(5);
    expect(_.get(object, 'd.k.3')).toStrictEqual({ g: 1 });
    expect(_.get(object, 'd.k.4')).toStrictEqual({ g: 2 });
    expect(_.get(object, 'd.k.3.g')).toStrictEqual(1);
    expect(_.get(object, 'd.k.4.g')).toStrictEqual(2);
  });

  it('get(obj, key)에서 정상적인 key가 아닐때 defaultValue를 리턴한다.', () => {
    expect(_.get(object, 'q', 1)).toStrictEqual(1);
    expect(_.get(object, 'q', null)).toStrictEqual(null);
    expect(_.get(object, 'q', undefined)).toStrictEqual(undefined);
  });
});
