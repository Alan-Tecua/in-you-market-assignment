import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import AddForm from '../AddForm';
import { User } from '../../types/userTypes';

describe('AddForm Component', () => {
  test('renders AddForm component', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    render(
      <Provider store={store}>
        <AddForm onClose={onClose} onSubmit={onSubmit} />
      </Provider>,
    );

    const formElement = screen.getByTestId('add-form');
    expect(formElement).toBeInTheDocument();
  });

  test('submits form data', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    render(
      <Provider store={store}>
        <AddForm onClose={onClose} onSubmit={onSubmit} />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Michael Keaton' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'Keaton@example.com' },
    });

    fireEvent.submit(screen.getByTestId('add-form'));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Michael Keaton',
        email: 'Keaton@example.com',
      }),
    );

    expect(onClose).toHaveBeenCalled();
  });
});
