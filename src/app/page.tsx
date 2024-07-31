'use client';

import Image from 'next/image';
import styles from './page.module.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import UserList from '../../components/UserList';

const HomePage: React.FC = () => {
  return (
    <Provider store={store}>
      <main className="p-2">
        <h1 className="title">IN YOU Assignment: User List Management</h1>
        <br />
        <UserList />
      </main>
    </Provider>
  );
};

export default HomePage;
