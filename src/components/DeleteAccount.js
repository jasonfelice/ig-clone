import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import errorHandler from '../errorHandler';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #eee',
  boxShadow: 24,
  p: 4,
};

export default function DeleteAccount({ open, setOpen, user, setWarning }) {
  const handleClose = () => setOpen(false);
  const [password, setPassword] = useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const credential =  EmailAuthProvider.credential(
        user.email,
        password
      );
      reauthenticateWithCredential(user , credential).then(() => {
        deleteUser(user).then(() => setWarning({ type: 'info', message: 'Your account has been deleted.'}));
      })
        .catch((error) => setWarning(errorHandler(error.code)));
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{textAlign: 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Delete Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2, textAlign: 'center' }}>
            If you are sure, please enter your password and click Delete.
          </Typography>
          <form onSubmit={handleSubmit}>
              <input required type="password" onChange={handlePassword} value={password} placeholder="current password"variant="outlined" />
              <Button type="submit" onClick={() => setOpen(true)} variant="outlined" color="error">Delete</Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}
