import React from 'react';
import Progress from './Progress';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Slingshot } from 'meteor/edgee:slingshot';
import uploadToS3 from '../../modules/upload-to-s3';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      uploadProgress: 0,
    };
    this.calculateProgress = this.calculateProgress.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  calculateProgress() {
    this.uploadComputation = Tracker.autorun(() => {
      const uploadProgress = Math.round(this.upload.progress() * 100);
      if (!isNaN(uploadProgress)) this.setState({ uploadProgress });
    });
  }

  handleUpload(event) {
    this.upload = new Slingshot.Upload('Uploader');
    this.calculateProgress();
    const file = event.target.files[0];

    uploadToS3(this, file).then((url) => {
      this.uploadComputation.stop();
      Meteor.call('files.store', { url, name: file.name }, (error) => {
        if (error) {
          this.setState({ isUploading: false, uploadProgress: 0 });
          console.log(this.state)
        }

        if (!error && this.state.uploadProgress === 100) {
          setTimeout(() => { this.setState({ isUploading: false, uploadProgress: 0 }); }, 500);
          console.log("success")
        }
      });
    })
    .catch((error) => {
      this.setState({ isUploading: false, uploadProgress: 0 });
      console.log(error)
    });
  }

  render() {
    return (<div className="Uploader">
      {
        this.state.isUploading ?
        <Progress bottom={ this.state.uploadProgress } top={ 100 } /> :
        <div>
          <input
            onChange={ this.handleUpload }
            type="file"
            name="Uploader"
          />
          <p><span>Click or Drop Files to Upload</span></p>
        </div>
      }
    </div>);
  }
}

Uploader.propTypes = {};

export default Uploader;
