import { addFunc, minusFunc, IFFunc } from '@/utils/index.js';

describe('utils test', () => {
  it('addFunc test', () => {
    expect(addFunc(1, 2)).toBe(3);
    expect(minusFunc(3, 1)).toBe(2);
    expect(IFFunc(2)).toBe('2');
    expect(IFFunc('2')).toBe('2');
  });
});