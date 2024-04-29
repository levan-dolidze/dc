import { TypeCheckerPipe } from './type-checker.pipe';

describe('TypeCheckerPipe', () => {
  it('create an instance', () => {
    const pipe = new TypeCheckerPipe();
    expect(pipe).toBeTruthy();
  });
});
