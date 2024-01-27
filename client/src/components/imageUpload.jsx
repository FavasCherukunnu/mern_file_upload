import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progressbar } from './progress_bar';
import axios from 'axios';

const ImageUpload = () => {

  const [acceptedFiles, setAcceptedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress,setShowProgress] = useState(false)

  const onDrop = useCallback(async(acceptedFiles) => {
    // Do something with the uploaded files, e.g., send to a server
    setUploadProgress(0);
    setShowProgress(true)

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    await axios.post('http://localhost:3002/api/upload', formData, {
      onUploadProgress: (progressEvent) => {
        // Calculate upload progress percentage
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      },
    })
    setShowProgress(false)

    setAcceptedFiles(acceptedFiles)
  }, []);
  const { getRootProps, getInputProps, isDragActive, } = useDropzone({ onDrop });

  // console.log(acceptedFiles)

  return (
    <div className="flex items-center justify-center h-screen">
      <Progressbar show={showProgress} value={uploadProgress} />
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 rounded p-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {
          acceptedFiles.length === 0 ?
            isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )
            : acceptedFiles.map(
              (file,index) => <p key={index}>{file.name}</p>
            )
        }
      </div>
    </div>
  );
};

export default ImageUpload;
