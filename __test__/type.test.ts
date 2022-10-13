import { expectType } from 'tsd';
import _ from '../src';

test('_.add 타입을 테스트한다.', () => {
  expectType<number>(_.add<number>(1, 2));
  expectType<string>(_.add<string>('1', '2'));
  // TODO: string으로 리턴하는 타입 만들기
  expectType<string | number>(_.add<string | number>('1', 2));
  expectType<string | number>(_.add<string | number>(1, '2'));
});

test('_.after 타입을 테스트한다.', () => {
  const strTest = _.after(1, () => 'hi');
  const numberTest = _.after(1, () => 1);
  expectType<string>(strTest());
  expectType<undefined>(numberTest());
});
