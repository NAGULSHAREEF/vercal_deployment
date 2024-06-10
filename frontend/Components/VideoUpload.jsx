// src/VideoUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
const VideoUpload = ({ onVideoUpload }) => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    onVideoUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="dropzone border p-4 text-center">
      <input {...getInputProps()} />
      <p>Drag 'n' drop a video file here, or click to select one</p>
      {files.map(file => (
        <div key={file.path} className="mt-2">{file.path} - {file.size} bytes</div>
      ))}
    </div>
  );
};

VideoUpload.propTypes = {
  onVideoUpload: PropTypes.func.isRequired,
};

export default VideoUpload;
