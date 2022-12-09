import React, { useState } from "react";
import "./CreatePost.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db, storage } from "../fire";
import { v4 as uuidv4 } from 'uuid';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LinearProgress from '@mui/material/LinearProgress';

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "1px solid #fafafa",
  boxShadow: 24,
  p: 4,
  borderRadius: "3px"
};

export default function CreatePost({open, setOpen, username}) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClose = () => setOpen(false);
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
          setProgress(progress);
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
              username
            });
          });
          setProgress(0);
          setUploading(false);
          setDescription("");
          setImage(null);
        }
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{textAlign: "center"}}id="transition-modal-title" variant="h6" component="h2">
              Create a post
            </Typography>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" placeholder="Write a caption" cols="30" rows="10"></textarea>
            <div className="createPost__panel">
                { uploading ?
              (<Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>) :
              (
               <>
              <IconButton aria-label="upload picture" component="label">
                <input onChange={handleChange} hidden accept="image/*" type="file" />
              <PhotoCamera />
              </IconButton>
              <Button onClick={handleUpload} variant="contained" component="label">Upload</Button>
                </>)
                }
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
