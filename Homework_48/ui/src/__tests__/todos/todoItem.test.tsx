import { fireEvent, render, waitFor } from '@testing-library/react';
import TodoItem from '../../components/Todos/TodoItem/TodoItem';

const todoMockProps = {
  _id: 'test-id',
  title: 'test-title',
  completed: false,
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
};

describe('TODO Item:', () => {
  let component: ReturnType<typeof render>;
  beforeEach(() => {
    jest.clearAllMocks();
    component = render(<TodoItem {...todoMockProps} />);
  });
  it('should render with valid markup and attribeutes on mount', () => {
    const { getByTestId, getByText } = component;

    const checkbox = getByTestId('test-checkbox') as HTMLInputElement;

    expect(checkbox).toHaveAttribute('id', 'test-id');
    expect(checkbox.checked).toBeFalsy();

    expect(getByText('in progres')).toBeInTheDocument();

    expect(getByText(/test-id/i)).toBeInTheDocument();
    expect(getByText('test-title')).toBeInTheDocument();

    expect(getByText(/Update/i)).toBeInTheDocument();
  });

  it('should change title and checbox after update', async () => {
    const { findByTestId, getByTestId, getByText, findByText } = component;

    fireEvent.click(getByText(/Update/i));

    fireEvent.change(await findByTestId('title'), {
      target: { value: 'changed-title' },
    });
    fireEvent.submit(getByText('Save'));

    expect(await findByText('changed-title')).toBeInTheDocument();
  });

  it('should show Input and change button on click, set correct input value', async () => {
    const { findByTestId, getByText, findByText } = component;

    fireEvent.click(getByText(/Update/i));

    const input = (await findByTestId('title')) as HTMLInputElement;

    expect(await findByText('Save')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test-title');
  });

  it('should change chexbox state and update with correct props', async () => {
    const { getByTestId } = component;

    const checkbox = getByTestId('test-checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();

    expect(todoMockProps.onUpdate).toHaveBeenCalled();
    expect(todoMockProps.onUpdate).toHaveBeenCalledWith({
      completed: true,
      _id: todoMockProps._id,
    });
  });
  it('should should call update on submit with correct props', async () => {
    const { getByText } = component;

    fireEvent.click(getByText(/Update/i));
    fireEvent.submit(getByText(/Save/i));

    await waitFor(() => {
      expect(todoMockProps.onUpdate).toHaveBeenCalled();
      expect(todoMockProps.onUpdate).toHaveBeenCalledWith({
        completed: false,
        _id: todoMockProps._id,
        title: todoMockProps.title,
      });
    });
  });
});
