import React from 'react';
import { Form } from '../../src/form/Form';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const MockForm = () => (
  <Form>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div>form</div>
        <input type="submit" />
      </form>
    )}
  </Form>
);

describe('<Form>', () => {
  it('cek Form render normal', () => {
    const { container } = render(<MockForm />);
    expect(container).toMatchSnapshot();
  });
});
