import { useState, useEffect } from "react";
import axios from "axios";
import login_side from "../assets/login_side.jpg"
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import { login, signup } from "../api/ApiFunctions";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false)
  const [signupForm, setSignupForm] = useState({username:"", password:"", conf_password:""})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setCurrentUser} = useUser();


  // dumb but simple form validation
  const disableSignUp = signupForm.username === ""      || 
                        signupForm.username.length < 6  || 
                        signupForm.password === ""      || 
                        signupForm.conf_password != signupForm.password

  async function handleSignup(e){
    e.preventDefault()
    try{
    const response = await signup({
                                    username: signupForm.username,
                                    password: signupForm.password,
                                  })
    if(response.status === 201) {
      handleLogin(e,signupForm.username, signupForm.password)
    }
    } catch (err) {
      console.log(error)
    }
  } 

  const handleLogin = async (e, name, pass) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({username: name,
        password: pass,
      });

      const { access, refresh } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);


      //Decode the token to get user info
      const decodedToken = jwtDecode(access)
      const user = {
        id: decodedToken.user_id
      }

      setCurrentUser(user);
      console.log('Login successful!');
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="login-tray ">
        <div className="image-container">
          <img src={"https://i.pinimg.com/736x/12/b9/48/12b948230a388ce063ef1d8d0afa0762.jpg"} alt="" />
        </div>
        <div className="form-container">
          <form className={`signin ${registering?'shift':'unshift'}`} onSubmit={handleLogin}>
            <h2>Welcome Back!</h2>
            {error && <p className="error">{error}</p>}

            <div className="login-inputs">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="login-inputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button onClick={(e) => handleLogin(e, username, password)}>Sign In</button>
            <p 
              onClick={(e) => {e.preventDefault()
                                setRegistering(prev => !prev)}} className="sign-up-toggle ">
              Sign Up
            </p>
          </form>

          <form className={`signup ${registering?'shift':'unshift'}`} onSubmit={handleSignup}>
            <h2>Lets Sign You Up!</h2>
            {error && <p className="error">{error}</p>}

            <div className="login-inputs">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={signupForm.username}
                onChange={(e) => setSignupForm(prev => ({...prev, [e.target.name]:e.target.value}))}
                required
              />
            </div>

            <div className="login-inputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm(prev => ({...prev, [e.target.name]:e.target.value}))}
                required
              />
            </div>

            <div className="login-inputs">
              <label htmlFor="conf_password">Confirm Password</label>
              <input
                type="password"
                name="conf_password"
                value={signupForm.conf_password}
                onChange={(e) => setSignupForm(prev => ({...prev, [e.target.name]:e.target.value}))}
                required
              />
            </div>

            <button 
                    // onClick={handleSignup}
                    disabled={disableSignUp}
                    style={disableSignUp? 
                                          {background: "#d1d1d1", cursor: "default"}:
                                          {}}>
              Sign Up
            </button>

            <div
              style={{marginTop: "auto", display: "flex", gap: "8px", justifyContent: "center"}}>
                <p>Already have an account?</p>
                <p 
                  onClick={(e) => {e.preventDefault()
                    setRegistering(prev => !prev)}}
                  style={{cursor: "pointer", color:"#6b55ff", fontWeight: "800"}}>
                  Sign In
                </p>
            </div>
          </form>

        </div>
      </div>

  );
};

export default Login;


