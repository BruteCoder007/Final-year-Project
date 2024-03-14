import React, { useState } from 'react';
import axios from 'axios';

const FilesUploadComponent = () => {

  const [faceImg, setfaceImg] = useState('');

  const onFileChange = (e) => {
    setfaceImg(e.target.files[0]);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('faceImg', faceImg);
    axios.post('http://localhost:5000/image/upload', formData, {
    }).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilesUploadComponent;
