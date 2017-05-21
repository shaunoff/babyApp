import React, { PropTypes } from 'react';


const Download = () =>
  <div style={{display: 'flex', alignItems: 'center',margin: '50px',flexDirection: 'column'}}>
    <h3 style={{color: '#aaa', margin: '20px', fontFamily: "arial"}}>Click the Icon to Download</h3>
    <a href="itms-services://?action=download-manifest&amp;url=https://obscure-inlet-34461.herokuapp.com/manifest.plist"><img src="/apple.png" alt="Apple-logo" width="100" height="100" /></a>
    <h3 style={{color: '#aaa', margin: '40px 20px 20px 40px', fontFamily: "arial"}}>Click the Icon to Download</h3>
    <a href="https://obscure-inlet-34461.herokuapp.com/app_release.apk" download="app_release.apk" download><img src="/android3.png" alt="android-logo" width="120" height="120" /></a>

  </div>

export default Download;
