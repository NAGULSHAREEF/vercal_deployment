import React from 'react';
import './WelcomePage.css'
import VideoMixerCode from './VideoMixerCode';
import '../public/photo12.png'
import '../public/photo234.png'
const WelcomePage = () => {
    

    return (
        <>
<div className="header">
<div className="mt-5 text-center">
      <h1 style={{ fontSize: '46px', fontWeight: 'bold', color: '#333' }}>Welcome to VidMerge!</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>Merge your favorite videos into one amazing video!</p>
      
    </div>
   <div className='d-flex flex-row justify-content-evenly'>
   <div className="hero1" style={{ marginLeft: '20px' }}>
    <img src="/frontend/public/photo234.png" alt="Hero" />
     </div>
     <div className="hero" style={{ marginLeft: '20px' }}>
    <img src="/frontend/public/photo12.png" alt="Hero Image" />
     </div>
  </div>
<ul className="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
    </div>
    <div className="call-to-action">
       <VideoMixerCode />
    </div>
</>
  );
};

export default WelcomePage;