/*
 * @Descripttion: test.spec.js
 * @Author: heidous
 * @Date: 2020-07-24 14:03:55
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-24 14:15:43
 */
import { testJest } from '@/currency';
jest.setTimeout(20000);

describe('ts test', () => {
  it('testJest', (done) => {
    expect(testJest('heidou', 'heidous11')).toBe(
      'firstName:heidoulastName:heidous11'
    );
    done();
  });
});
