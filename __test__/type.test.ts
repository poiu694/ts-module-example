import { expectType } from 'tsd';
import _ from '../src';

test('_.add 타입을 테스트한다.', () => {
  expectType<string | number>(_.add<string | number>(1, 2));
  expectType<string | number>(_.add<string | number>('1', '2'));
  expectType<string | number>(_.add<string | number>('1', 2));
  expectType<string | number>(_.add<string | number>(1, '2'));
});
