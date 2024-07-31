import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import UserList from '../../UserList';

const testUser = [
  {
    id: 1,
    name: 'Michael Keaton',
    email: 'Keaton@example.com',
    avatar: 'https://picsum.photos/seed/${Math.random()}/200',
    phone: '000-000-0000',
    website: 'keaton.com',
    address: {
      street: 'Elm Street',
      city: 'Town B',
    },
    company: {
      name: 'Keaton Inc.',
    },
  },
  {
    id: 2,
    name: 'Keaton Michel',
    email: 'Michel@example.com',
    avatar: 'https://picsum.photos/seed/${Math.random()}/200',
    phone: '000-000-0000',
    website: 'Michel.com',
    address: {
      street: 'Elmo Street',
      city: 'Town B',
    },
    company: {
      name: 'Keaton&Sons Inc.',
    },
  },
];

jest.mock('../../services/userAPI', () => ({
  fetchUsers: jest.fn().mockResolvedValue(testUser),
}));

describe('UserList Component', () => {
  test('renders user list with users', async () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );

    for (const user of testUser) {
      expect(await screen.findByText(user.name)).toBeInTheDocument();
    }
  });

  test('renders Register New User button', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );

    const buttonElement = screen.getByText(/Register New User/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
