import React, { PropTypes } from 'react';


const Download = () =>
  <div style={{display: 'flex', alignItems: 'center',margin: '50px',flexDirection: 'column'}}>
    <h3 style={{color: '#aaa', margin: '20px', fontFamily: "arial"}}>Click the Icon to Download</h3>
    <a href="itms-services://?action=download-manifest&amp;url=https://obscure-inlet-34461.herokuapp.com/manifest.plist"><img src="/apple.png" alt="Apple-logo" width="100" height="100" />

</a>

  </div>

export default Download;
