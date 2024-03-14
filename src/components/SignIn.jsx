import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const navigate=useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [message,setmessage]=React.useState("  ");
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  axios.defaults.withCredentials=true;
  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are loging with email: ${email} and password: ${password}`);
    axios.post("http://localhost:5000/authenticationapi/login",state)
    .then((res)=>{
      console.log(res);
    if(res.data.Status==="Success"){
      if(res.data.role==="visitor"){
        navigate('/capture')
      }
      else{
        navigate('/login')
      }
    }})
    .catch((err)=>{setmessage(err.response.data.message); console.log(err);})
    
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <div style={{color:"#ff416c",fontSize:"15px",paddingTop:"15px"}}>{message}</div>
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
