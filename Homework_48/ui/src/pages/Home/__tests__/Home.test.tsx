import { Component } from '../Home';
import { renderWithStore } from '../../../__tests__/__mocks__/mocks';

describe('Pages - Home', () => {
  it('Should render title ', () => {
    const { getByText } = renderWithStore(<Component />);

    const titleText = getByText('Welcome! Create your tasks for all day!');

    expect(titleText).toBeInTheDocument();
  });
});
