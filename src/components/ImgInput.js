'use client'
import React, { useRef, useState, useEffect } from 'react';
import "../css/globals.css";
// import "../css/new-post.css";
import { ImFilePicture } from "react-icons/im";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase/firebaseStorage"
import Image from 'next/image';


import { useUserStore } from '@/store/store';

const ImgInput = () => {

  const { setAttachments, attachments, setUploadProgressCaption, attachmentProgress, setAttachmentProgress } = useUserStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("")
  const fileInputRef = useRef(null);

  function doOpen() {

    imgFile.click();

  }

  const handleUploadFile = async (file) => {
    if (file) {
      setUploadProgressCaption("Uploading...")
      const name = file.name
      const storageRef = ref(storage, `image/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setAttachmentProgress(progress) // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url)
            // console.log(url)
            setAttachments({ type: "image", url: url })
            // console.log(attachments)
            setUploadProgressCaption("Uploaded")
          })
        },
      )
    } else {
      console.error('File not found')
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(`Selected: ${file}`)
    if (file) {
      // console.log(file)
      setSelectedFile(file);
      // console.log("Selected file:", file.name);
    }

    if (file && file.size < 5000000) {
      console.log(file)
      setSelectedFile(file)
      await handleUploadFile(file);
    } else {
      console.error('File size to large')
      setUploadProgressCaption("You can upload image less than 5 MB")
    }

  };

  return (
    <div >
      <input
        type="file"
        htmlFor="imgFile"
        accept=".jpg,.png,.jpeg,.gif"
        onChange={handleFileChange}
        id="imgFile"
        disabled={attachments.length === 5}
        style={{ display: 'none' }}
      />
      <label onClick={doOpen} style={{ display: 'inline-block', cursor: 'pointer', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>

        <span >
          <ImFilePicture className="icon" />
        </span>
      </label>
    </div>

  );
};

export default ImgInput;