'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';

import { RootState, AppDispatch } from '../store';

import EditForm from '../components/EditForm';
import AddForm from '../components/AddForm';
import { fetchUsers } from '../services/userAPI';
import { setUsers, deleteUser, addUser } from '../slices/userSlice';
import { User } from '../types/userTypes';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

export interface UsersState {
  users: User[];
}

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [addingUser, setAddingUser] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUsers();
      const avatarPicture = data.map((user: User) => ({
        ...user,
        avatar: `https://picsum.photos/seed/${Math.random()}/200`,
      }));
      // dispatch(setUsers(data));
      dispatch(setUsers(avatarPicture));
    };

    loadData();
  }, [dispatch]);

  //EditHandles

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };
  const handleCloseEdit = () => {
    setEditingUser(null);
  };

  //AddingHandles

  const handleAddUser = () => {
    setAddingUser(true);
  };
  const handleCloseAdd = () => {
    setAddingUser(false);
  };

  //AvatarHandles
  const handleAvatar = (user: Omit<User, 'avatar'>) => {
    const newUser = {
      ...user,
      avatar: `https://picsum.photos/seed/${Math.random()}/200`, // Random image for new users
    };
    dispatch(addUser(newUser));
  };

  //DetailHandle
  const handleUserDetails = async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    const data = await response.json();
    setUserDetails(data);
    setModalOpen(true);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {users.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="h5">{user.name}</Typography>
                <Typography className="highlight-color" color="textSecondary">
                  {user.email}
                </Typography>
                <CardActions>
                  <Button
                    className="btn-option"
                    variant="contained"
                    onClick={() => handleUserDetails(user.id)}
                  >
                    About
                  </Button>
                  <Button
                    className="btn-option"
                    variant="contained"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-option"
                    variant="contained"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <Button className="btn-color" variant="contained" onClick={handleAddUser}>
        Register New User
      </Button>
      {editingUser && (
        <EditForm
          user={editingUser}
          onClose={handleCloseEdit}
          onSubmit={function (user: Omit<User, 'avatar'>): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
      {addingUser && (
        <AddForm onSubmit={handleAvatar} onClose={handleCloseAdd} />
      )}
      {/* User Details Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>
          {userDetails && (
            <div>
              <Stack alignItems="center">
                <Avatar
                  alt={userDetails.name}
                  src={userDetails.avatar}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
              <Stack alignItems="center">
                <DialogTitle>{userDetails.name}</DialogTitle>
                <Typography className="m-05" color="textSecondary">
                  {userDetails.email}
                </Typography>
              </Stack>
              <Typography>Phone: {userDetails.phone || 'N/A'}</Typography>
              <Typography>Website: {userDetails.website || 'N/A'}</Typography>
              <Typography>
                Address:{' '}
                {userDetails.address
                  ? `${userDetails.address.street}, ${userDetails.address.city}`
                  : 'N/A'}
              </Typography>
              <Typography>
                Company:{' '}
                {userDetails.company ? userDetails.company.name : 'N/A'}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
