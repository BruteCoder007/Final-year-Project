import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Upload from './components/upload';
import WebcamCapture from './components/WebcamCapture';
import Login from './components/login'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/capture' element={<WebcamCapture/>}/>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
