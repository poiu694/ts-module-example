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
});
