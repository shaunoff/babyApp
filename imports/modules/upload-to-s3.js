export default (component, file) =>
new Promise((resolve, reject) => {
  component.setState({ isUploading: true });
 console.log("hello")
  component.upload.send(file, (error, url) => {
    if (error) {

      reject(error);
    } else {
      resolve(url);
    }
  });
});
