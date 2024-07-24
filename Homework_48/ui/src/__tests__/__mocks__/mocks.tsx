import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../redux/slices/todoSlice';

export const todoItems = [{ _id: '1231312', title: 'title', completed: true }];

const initialMockState: typeof initialState = {
  items: [],
  loading: false,
  error: null,
};

export const renderWithStore = (
  children: JSX.Element,
  initial_state: typeof initialState = initialMockState,
  ...rest: any
) => {
  const mockStore = configureMockStore();
  const store = mockStore({
    counter: {
      value: 0,
    },
    todos: initial_state,
  });
  return render(<Provider store={store}>{children}</Provider>, ...rest);
};
