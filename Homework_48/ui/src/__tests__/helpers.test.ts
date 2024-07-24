import { validate, uuid, getInitialTodoSate } from '../misc/helpers';
import { todoItems } from './__mocks__/mocks';

describe('testing helepers functions', () => {
  describe('Function: validate ', () => {
    it('should return true with any string', () => {
      const isValid = validate('Custom string');

      expect(isValid).toBeTruthy();
    });
    it('should return false if empty', () => {
      const isValid = validate('');

      expect(isValid).toBeFalsy();
    });
    it('should trim string and return false', () => {
      const isValid = validate('    ');

      expect(isValid).toBeFalsy();
    });
  });
  describe('Function: uuid', () => {
    it('should return random string must have length 14', () => {
      const random = uuid();

      expect(random).toHaveLength(14);
    });
    it('return type should be string', () => {
      const random = uuid();
      console.log(random);
      expect(typeof random).toBe('string');
    });
  });
  describe('Function: getInitialTodoSate', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should return mocked Todo items from localstorage', () => {
      const mockGetItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementationOnce(() => JSON.stringify(todoItems));
      const mockParseItem = jest.spyOn(JSON, 'parse');

      const state = getInitialTodoSate();

      expect(mockGetItem).toHaveBeenCalled();
      expect(mockParseItem).toHaveBeenCalled();
      expect(state).toEqual(todoItems);
    });
    it('should return empty array if storage is empty', () => {
      const mockGetItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementationOnce(() => null);
      const mockParseItem = jest.spyOn(JSON, 'parse');

      const state = getInitialTodoSate();

      expect(mockGetItem).toHaveBeenCalled();
      expect(mockParseItem).toHaveBeenCalledTimes(0);
      expect(state).toEqual([]);
    });
  });
});
