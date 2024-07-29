import reducer, {
  add,
  remove,
  update,
  setLoading,
} from '../../redux/slices/todoSlice';
import type { ITodoItem } from '../../types';

describe('TODO Reducers: ', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  it('should handle a todo being added to an empty list', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [],
      loading: false,
      error: null,
    };

    expect(
      reducer(
        previousState,
        add({ title: 'todo', completed: false, _id: '123' })
      )
    ).toEqual({
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    });
  });

  it('should handle a todo being added to an existing list', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [{ title: 'todo', completed: true, _id: '123' }],
      loading: false,
      error: null,
    };

    expect(
      reducer(
        previousState,
        add({ title: 'todo', completed: false, _id: '123' })
      )
    ).toEqual({
      items: [
        { title: 'todo', completed: true, _id: '123' },
        { title: 'todo', completed: false, _id: '123' },
      ],
      loading: false,
      error: null,
    });
  });

  it('should remove item from list', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    };

    expect(
      reducer(
        previousState,
        remove({ title: 'todo', completed: false, _id: '123' })
      )
    ).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  it('should update item in list', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    };

    expect(
      reducer(
        previousState,
        update({ title: 'updated value', completed: true, _id: '123' })
      )
    ).toEqual({
      items: [{ title: 'updated value', completed: true, _id: '123' }],
      loading: false,
      error: null,
    });
  });

  it('should not update item in list', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    };

    expect(
      reducer(
        previousState,
        update({ title: 'updated value', completed: true, _id: '1' })
      )
    ).toEqual({
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    });
  });

  it('should update loading', () => {
    const previousState: {
      items: ITodoItem[];
      loading: boolean;
      error: Error | null;
    } = {
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: false,
      error: null,
    };

    expect(reducer(previousState, setLoading(true))).toEqual({
      items: [{ title: 'todo', completed: false, _id: '123' }],
      loading: true,
      error: null,
    });
  });
});
