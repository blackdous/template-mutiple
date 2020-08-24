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
