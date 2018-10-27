require('normalize.css/normalize.css');
require('styles/App.css');
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import React from 'react';




class AppComponent extends React.Component {

 constructor(props) {
  super(props)
  this.state = {
   src: null,
   cropResult: null

  }
  this.handleChange = this.handleChange.bind(this);
  this.cropImage = this.cropImage.bind(this);
  this.printPreview = this.printPreview.bind(this);
  this.saveImage = this.saveImage.bind(this);
  this.clearImage = this.clearImage.bind(this);

 }
 clearImage(event) {

  var imginput = document.getElementById('input');
  imginput.value = "";
  this.setState({
   src: null,
   cropResult: null
  });
  // this.cropper.reset();
  if (document.querySelector('.cropper-bg')) document.querySelector('.cropper-bg').style.display = "none";
  //if(document.querySelector('.cropper-view-box img'))document.querySelector('.cropper-view-box img').setAttribute('src','')




 }
 handleChange(event) {
  var link = document.getElementById('saveresult');
  link.style.display = "none";
  if (event.target.files[0].size > 1000000) {
   alert("File is too big!");
   event.target.value = "";
   this.setState({
    src: null
   })
  } else {
   this.setState({
    src: URL.createObjectURL(event.target.files[0])
   })

  }
 }


 useDefaultImage() {
  this.setState({
   src:''
  });
 }
 saveImage(event) {
  var link = document.getElementById('saveresult');
  link.style.display = "block";

  return Promise.resolve(link.href);

 }
 printPreview(event) {

  var largeImage = document.getElementById('display');
  largeImage.style.display = 'block';
  largeImage.style.width = 100 + "px";
  largeImage.style.height = 100 + "px";
  largeImage.style.marginLeft = "calc(50% - 100px)";
  var url = largeImage.getAttribute('src');
  var w = window.open("");
  w.document.write(largeImage.outerHTML);
  w.print();
  w.close();

 }
 openFile(event) {

 }

 cropImage() {
  if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
   return;
  }

  this.setState({
   cropResult: this.cropper.getCroppedCanvas({
    minWidth: 800,
    minHeight: 100
   }).toDataURL(),
  });
 }


  render() {
    return (
      <div className="index" >
        <header><h1>Upload Image</h1></header>
        <input id="input" type="file" onChange={this.handleChange}  accept="image/png, image/jpeg" /><br/>
       
       

         <Cropper
            style={{ height: 500, width: '90%' }}
            aspectRatio={16 / 9}
            id="cropper"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        <img id="display" src={this.state.cropResult}/>
        <button id="clearimage" onClick={this.clearImage} className="imagefunction" >Clear</button><br/>
        <button id="printimage" onClick={this.printPreview} className="imagefunction">Print Preview</button> <br/>
        <button disabled={!this.state.src} id="cropimage" onClick={this.cropImage} className="imagefunction">Crop</button> <br/>
        <button   disabled={!this.state.cropResult} id="saveimage" onClick={this.saveImage} className="imagefunction">Save</button><br/>
        <a href={this.state.cropResult} id="saveresult"  target="_blank">Download Saved Image</a>



      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
