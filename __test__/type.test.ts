import { expectType } from 'tsd';
import _ from '../src';

test('_.add 타입을 테스트한다.', () => {
  expectType<number>(_.add<number>(1, 2));
  expectType<string>(_.add<string>('1', '2'));
  // TODO: string으로 리턴하는 타입 만들기
  expectType<string | number>(_.add<string | number>('1', 2));
  expectType<string | number>(_.add<string | number>(1, '2'));
});
