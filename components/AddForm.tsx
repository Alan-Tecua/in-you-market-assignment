import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addUser } from '../slices/userSlice';
import { User } from '../types/userTypes';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Stack,
} from '@mui/material';

interface AddFormProps {
  onClose: () => void;
  onSubmit: (user: Omit<User, 'avatar'>) => void;
}

const AddForm: React.FC<AddFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      avatar: `https://picsum.photos/seed/${Math.random()}/200`,
      phone: 'N/A',
      website: 'N/A',
      address: {
        street: 'N/A',
        city: 'N/A',
      },
      company: {
        name: 'N/A',
      },
    };
    dispatch(addUser(newUser));
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Registration</DialogTitle>
      <form onSubmit={handleSubmit} data-testid="add-form">
        <DialogContent>
          <Stack spacing={2} direction="column">
            <TextField
              autoFocus
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Register</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddForm;
