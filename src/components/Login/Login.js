import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })

  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }



  return (
    <div className="App container d-flex justify-content-center ">
    <div className="bg-light shadow w-50 mt-5 ">
      <div className=" m-4">
        <h1> Welcome To Our World </h1>
      
     
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      
      <form onSubmit={handleSubmit} className="m-3 " action="">
        {newUser && <input className="form-control " name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input className="form-control " type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input className="form-control " type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <div className=" d-flex justify-content-center m-3 ">
              <input className="bg-primary w-25 r  form-control text-white " type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </div>
      
      </form>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <p style={{color: 'red'}}>{user.error}</p>
      
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}

      
      { user.isSignedIn ? <i onClick={signOut}><i  className="fab fa-google-plus-square m-2 text-warning  fa-3x"></i></i> :
        <i onClick={googleSignIn}><i  className="fab fa-google-plus-square m-2 text-warning  fa-3x"></i></i>
      }
       <i onClick={fbSignIn} className="fab fa-facebook-square m-2 text-primary fa-3x"></i>

       </div>
      </div>
    </div>
  );
}

export default Login;