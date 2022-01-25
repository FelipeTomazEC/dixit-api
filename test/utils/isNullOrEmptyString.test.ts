import { nullAsValue } from '@test/test-helpers/null-as-value';
import { undefinedAsValue } from '@test/test-helpers/undefined-as-value';
import { isNullOrEmptyString } from '@utils/isNullOrEmptyString';

describe('Is null or empty string function test', () => {
  it('must return true for empty string.', () => {
    expect(isNullOrEmptyString('')).toBe(true);
  });

  it('must return true for string with only spaces.', () => {
    expect(isNullOrEmptyString('      ')).toBe(true);
  });

  it('must return true for null value.', () => {
    expect(isNullOrEmptyString(nullAsValue())).toBe(true);
  });

  it('must return true for undefined value', () => {
    expect(isNullOrEmptyString(undefinedAsValue())).toBe(true);
  });

  it('must return false otherwise.', () => {
    expect(isNullOrEmptyString('whatever')).toBe(false);
  });
});
