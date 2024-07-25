import { getByText, render } from '@testing-library/react';
import Todo from '../Todo';
import { useAppSelector } from '../../../redux/hooks';
import { renderWithStore } from '../../../__tests__/__mocks__/mocks';

const todoItems = [
  { _id: '1231312', title: 'title', completed: false },
  { _id: '1231313', title: 'title', completed: false },
];

describe('TODO Test:', () => {
  let component: ReturnType<typeof render>;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render empty todos and show error text', async () => {
    const { getByText, queryAllByText } = renderWithStore(<Todo />);

    const card = queryAllByText('title');
    const errorMsg = getByText('Todos list is empty!');

    expect(card.length).toBe(0);
    expect(errorMsg).toBeInTheDocument();
  });

  it('should render 2 todos and dont show error text', async () => {
    const { queryAllByText, queryByText } = renderWithStore(<Todo />, {
      items: todoItems,
      loading: false,
      error: null,
    });
    const errorMsg = queryByText('Todos list is empty!');
    const card = queryAllByText('title');

    expect(errorMsg).toBeNull();
    expect(card.length).toBe(2);
  });

  it('should call fetch action on mount', async () => {
    const { store } = renderWithStore(<Todo />, {
      items: todoItems,
      loading: false,
      error: null,
    });

    expect(store.getActions()[0]).toEqual({
      type: 'todos/fetchAllTodos',
      payload: undefined,
    });
  });
});
