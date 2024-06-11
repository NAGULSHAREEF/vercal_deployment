import React ,{useState} from 'react'
import axios from 'axios';
import VideoUpload from './VideoUpload';
import '../public/download-png.png'

import '../src/App.css';

const VideoMixerCode = () => {
    const [video1, setVideo1] = useState(null);
    const [video2, setVideo2] = useState(null);
    const [mixedVideoUrl, setMixedVideoUrl] = useState('');
  
    const handleUploadVideo1 = (files) => setVideo1(files[0]);
    const handleUploadVideo2 = (files) => setVideo2(files[0]);
  
    const handleMixVideos = async () => {
      if (video1 && video2) {
        const formData = new FormData();
        formData.append('video1', video1);
        formData.append('video2', video2);
  
        try {
          const response = await axios.post('http://vercal-deployment-backend.vercel.app/mix-videos', formData, {
            headers: {
              'Content-Type': 'ultipart/form-data',
            },
          });
          setMixedVideoUrl(response.data.mixedVideoUrl);
        } catch (error) {
          console.error('Error mixing videos', error);
        }
      }
    };
  
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-5" style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
          Mix Your Videos (.mp4)
        </h1>
        <div className="row">
          <div className="col-md-6">
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#666' }}>Upload Video 1</h2>
            <VideoUpload onVideoUpload={handleUploadVideo1}>
              <img src="upload-icon.png" alt="Upload Icon" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <p style={{ fontSize: '16px', color: '#999' }}>Drag and drop or click to upload</p>
            </VideoUpload>
          </div>
          <div className="col-md-6">
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#666' }}>Upload Video 2</h2>
            <VideoUpload onVideoUpload={handleUploadVideo2}>
              <img src="upload-icon.png" alt="Upload Icon" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <p style={{ fontSize: '16px', color: '#999' }}>Drag and drop or click to upload</p>
            </VideoUpload>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="mix-btn" onClick={handleMixVideos} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '10px' }}>
            Mix Videos
          </button>
        </div>
        {mixedVideoUrl && (
          <div className="mixed-video-section">
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#666' }}>Mixed Video</h2>
            <video controls src={mixedVideoUrl} className="w-100" style={{ width: '100%', height: '400px', borderRadius: '10px' }} />
            <div className='mt-3'>
            <a href={mixedVideoUrl} download="mixed_video.mp4" className="download-btn " style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '10px' }}>
              <img src="/frontend/public/download-png.png" alt="Download Icon" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              Download Mixed Video
            </a>
            </div>
          </div>
        )}
      </div>
    );
}

export default VideoMixerCode