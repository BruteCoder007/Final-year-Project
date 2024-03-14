// import React, { Component, useState } from 'react';

// import './cameraStyles.css'

// import Webcam from "react-webcam";

// // **const WebcamComponent = () => <Webcam />;**

// const videoConstraints = {
//   width: 220,
//   height: 200,
//   facingMode: "user"
// };

// const WebcamCapture = () => {

// const webcamRef = React.useRef(null);

//   const capture = React.useCallback(
//     () => {
//     //   **const imageSrc = webcamRef.current.getScreenshot();**
//     },

//     [webcamRef]
//   );

//   return (
//     <div className="webcam-container">
//       {/* <**Webcam** */}
//        <Webcam audio={false}
//         height={200}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={220}
//         videoConstraints={videoConstraints}
//       />
//       <button
//       onClick={(e)=>{e.preventDefault();capture();}}>
//       Capture</button>
//     </div>
//   );
// };
import React from "react";
import Webcam from "react-webcam";
import axios from "axios";
import '../styles/WebcamGrid.css'
import { useRef,useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blackscreen from "../assets/blackscreen.png";
export default function WebcamCapture()
{ 
   axios.defaults.withCredentials=true;
    const [status,setStatus]=useState(false); 
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:5000/image/authenticate")
        .then(res=>{
          if(res.data==="Success"){
            console.log("Authorisation successful");
            setStatus(true); 
          }
          else{
            setStatus(false);
            navigate("/login");
          }
        })
        .catch(err=>{
          console.log("Error occured in authorization");
          console.log(err);

        })
    },[]) 
    const webcamRef = useRef(null);
    const [faceImg, setfaceImg] = useState(blackscreen);
    const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setfaceImg(imageSrc);
    // const formData = new FormData();
    // formData.append('image', faceImg);
    // // console.log("image"+faceImg)
    axios.post('http://localhost:5000/image/capture',{faceImg}).then(res => {
  
      console.log(res);
    }).catch(err=>{console.log(
      err
    )});
    }
    return (status&&<div style={{height:"100%",width:"100%",backgroundColor:"rgba(0, 0, 0, 0.3)"}}>
    <div className="webcam-grid">
<Webcam
        width="500px"
        height="400px"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-video"
      />
    </div>
    <div style={{position:"relative",top:"26%",left:"55%",width:"600px",height:"600px" , borderRadius:"100px"}}>
       <img src={faceImg} alt="captured image" width="500px" height="400px" style={{borderRadius:"80px"}}/>
    <button style={{position:"relative",top:"-1%",left:"-100%"}} onClick={captureImage}>Capture Image</button></div>
    </div>
    
)
}


