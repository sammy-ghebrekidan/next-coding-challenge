import { getLocalStorage, setLocalStorage } from './client';

describe('storage client', () => {
  beforeEach(() => localStorage.clear());

  describe('getLocalStorage', () => {
    it('returns fallback when key not found', () => {
      expect(getLocalStorage('missing', 'default')).toBe('default');
    });

    it('returns parsed value when key exists', () => {
      localStorage.setItem('test', JSON.stringify({ a: 1 }));
      expect(getLocalStorage('test', {})).toEqual({ a: 1 });
    });
  });

  describe('setLocalStorage', () => {
    it('saves value to localStorage', () => {
      setLocalStorage('key', { data: 'test' });
      expect(localStorage.getItem('key')).toBe('{"data":"test"}');
    });
  });
});
