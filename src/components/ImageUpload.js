import React, { Component } from 'react'
import axios from 'axios'
import Commonheader from '../components/Commonheader'

class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // api/v1/upload_image
    const file = this.state.file;
    var imageData = new FormData();
    imageData.append('image', file);
    console.log('handle uploading-', imageData);
    axios.put('http://localhost:4000/api/v1/upload_image', imageData)
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));

  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    console.log(file);
    reader.readAsDataURL(file)
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return(
      <div className="previewComponent">
        <Commonheader />
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
