import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { renderWithStore } from '../../../../__tests__/__mocks__/mocks';
import TodoAdd from '../TodoAdd';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('TodoAdd:', () => {
  let component: ReturnType<typeof renderWithStore>;
  const onAddMock = jest.fn();

  beforeEach(() => {
    component = render(<TodoAdd onAdd={onAddMock} />);
  });

  describe('Form Validation: ', () => {
    it('should change input value', async () => {
      const { getByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'str' } });

      expect(input.value).toBe('str');
    });

    it('should show correct error message on focus', async () => {
      const { getByTestId, findByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;

      fireEvent.focus(input);

      const errorElement = (await findByTestId(
        'error-msg'
      )) as HTMLParagraphElement;

      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('This field is Required');
      expect(await findByTestId('test-submit')).toBeDisabled();
    });

    it('should show correct error message on change', async () => {
      const { getByTestId, findByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'str' } });

      const errorElement = (await findByTestId(
        'error-msg'
      )) as HTMLParagraphElement;

      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Input is Too Short!');
      expect(await findByTestId('test-submit')).toBeDisabled();
    });

    it('should not show error msg', async () => {
      const { getByTestId, queryByTestId, findByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'strasdad' } });

      const errorElement = await waitFor(
        () => queryByTestId('error-msg') as HTMLParagraphElement
      );

      expect(errorElement).toBeNull();
      expect(await findByTestId('test-submit')).not.toBeDisabled();
    });
  });
  describe('Form submition: ', () => {
    it('onAdd: should called with properly properties', async () => {
      const { getByTestId, findByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'testInput' } });

      const submitButton = await findByTestId('test-submit');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onAddMock).toHaveBeenCalled();
        expect(onAddMock).toHaveBeenCalledWith({ title: 'testInput' });
      });
    });
    it('onAdd: should reset input after call', async () => {
      const { getByTestId, findByTestId } = component;
      const input = getByTestId('input-test') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'testInput' } });

      const submitButton = await findByTestId('test-submit');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });
  });
});
