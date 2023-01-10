import React, { useState } from "react";
import "./Account.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db, storage } from "../fire";
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';

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

export default function Account({open, setOpen, user}) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    const storageRef = ref(storage, `images/${uuidv4() + image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          // Handle error
          setUploading(false);
        },
        () => {
          // Handle upload success 
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "posts"),{
              timestamp: serverTimestamp(),
              imageUrl: downloadURL,
              description,
              username: user.displayName
            });
          });
          setUploading(false);
          setDescription("");
          setImage(null);
        }
    );
  };

  return (
    <>
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
            {image?.name && (<p style={{marginLeft: '5px', color: '#444', alignSelf: 'center', fontSize: '12px'}}>{image.name}</p>)}
            </IconButton>
          </div>
          <div className="setting__item">
            <Typography>Name</Typography>
            <TextField sx={{border: 'none'}} id="outlined-basic" label={user.displayName} variant="outlined" />
          </div>
          <div className="setting__item">
            <Typography>Email</Typography>
            <TextField sx={{border: 'none'}} id="outlined-basic" label={user.email} variant="outlined" />
          </div>
        </div>
      </Box>
    </>
  );
};
