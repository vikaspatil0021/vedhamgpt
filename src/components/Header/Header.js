import React from 'react';
import './Header.css';
import profile_ from "./../../assets/profile_.jpg"
import html2canvas from 'html2canvas';

const Header = () => {

  function shareScreenshot() {
    // Get the div element you want to capture
    const contentElement = document.querySelector('.contentToShare');

    html2canvas(contentElement).then(canvas => {
      // Convert the canvas to a Blob
      canvas.toBlob(blob => {
        // Create a file object from the Blob
        const file = new File([blob], 'screenshot.png', { type: 'image/png' });

        // Use the Web Share API to share the file object
        if (navigator.share) {
          navigator.share({
            files: [file]
          })
          .then(() => {
            console.log('Screenshot shared successfully.');
          })
          .catch((error) => {
            console.error('Error sharing screenshot:', error);
          });
        } else {
          // Fallback for browsers that do not support the Web Share API
          // You can open the file or dataURL in a new window here
          console.warn('Web Share API not supported, use fallback here.');
        }
      }, 'image/png'); // Convert the canvas to a PNG format
    })
}
  return (
    <div className='h-position'>

      <div className='h-container'>
        <div>
          <div className='h-sidebar-icon'>
            <i class="fa-solid fa-bars"></i>
          </div>
            <div>
              <span className='h-brand'>Vedham</span>
            </div>
        </div>

        <div className='h-profile' onClick={()=>{
          shareScreenshot()
        }}>
            <img src={profile_} alt='profile' className='h-profileImg' />
          <div className='h-profileName'>
            Vikas Patil
          </div>
        </div>

      </div>
     
    </div>
  )
}

export default Header;
