'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editUser } from '../slices/userSlice';
import { User } from '../types/userTypes';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Stack,
} from '@mui/material';

interface EditFormProps {
  user: User;
  onClose: () => void;
  onSubmit: (user: Omit<User, 'avatar'>) => void;
}

const EditForm: React.FC<EditFormProps> = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user.id,
        name,
        email,
        avatar,
        phone: undefined,
        website: undefined,
        address: undefined,
        company: undefined,
      }),
    );
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Information</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div>
            <Grid item xs={12}>
              <Stack spacing={2} direction="column">
                <TextField
                  autoFocus
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  autoFocus
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Commented out avatar changes */}
                {/* <TextField
                autoFocus
                label="Avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              /> */}
              </Stack>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit"> Confirm </Button>
          <Button onClick={onClose}> Cancel </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditForm;
