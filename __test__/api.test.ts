import _ from '../src';

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
