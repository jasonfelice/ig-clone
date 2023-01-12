import React, { useState } from "react";
import "./Account.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../fire";
import { updateEmail, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteAccount from '../components/DeleteAccount';

const style = {
  margin: "50px auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "90%",
  bgcolor: "background.paper",
  border: "1px solid #dbdbdb",
  p: 4,
  borderRadius: "3px"
};

export default function Account({ user }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = () => {
    if(name) {
      updateProfile(user, { displayName: name });
    }
    if(password) {
      const credential =  EmailAuthProvider.credential(
        user.email,
        password
      );
      reauthenticateWithCredential(user , credential).then(() => {
        updatePassword(user, newPassword);
      });
    }
    if(email) {
      const credential =  EmailAuthProvider.credential(
        user.email,
        password
      );
      reauthenticateWithCredential(user , credential).then(() => {
        updateEmail(user, email);
      });
    }
    if(image) {
      const storageRef = ref(storage, `${user.uid}/${"profilePicture." + image.name.split('.')[1]}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (error) => {
          // Handle error
        },
        () => {
          // Handle upload success 
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(user, { photoURL: downloadURL})
          });
          setImage(null);
        }
    );
    }
  };

  return (
    <>
      < DeleteAccount user={user} open={open} setOpen={setOpen}/>
      <Box sx={style}>
        <Typography sx={{textAlign: "center"}}id="transition-modal-title" variant="h6" component="h2">
          Account settings
        </Typography>

        <div className="account__settings-panel">
          <div className="setting__item">
            <Typography>Profile Picture</Typography>
            <IconButton aria-label="upload picture" component="label">
              <input onChange={handleChange} hidden accept="image/*" type="file" />
            <PhotoCamera />
            </IconButton>
            {image?.name && (<span style={{marginLeft: '5px', color: '#444', alignSelf: 'center', fontSize: '12px'}}>{image.name}</span>)}
          </div>
          <div className="setting__item">
            <Typography>Name</Typography>
            <TextField onChange={handleName} value={name} sx={{border: 'none'}} label={user.displayName} variant="outlined" />
          </div>
          <div className="setting__item">
            <Typography>Email</Typography>
            <TextField type="email" onChange={handleEmail} value={email} sx={{border: 'none'}} label={user.email} variant="outlined" />
          </div>
          <div className="setting__item">
            <Typography>New Password</Typography>
            <TextField type="password" onChange={handleNewPassword} value={newPassword} sx={{border: 'none'}} label="password" variant="outlined" />
          </div>
          {(email || newPassword) && (
            <div className="setting__item">
              <Typography>Current Password</Typography>
              <TextField type="password" onChange={handlePassword} value={password} sx={{border: 'none'}} label="current password"variant="outlined" />
            </div>
          )}
          <div>
            <Button onClick={() => setOpen(true)} variant="outlined" color="error">Delete Account</Button>
          </div>
        </div>
        <Button onClick={handleSubmit} sx={{marginTop: '26px', alignSelf: 'center'}} variant="outlined" size="small">Save</Button>
      </Box>
    </>
  );
};