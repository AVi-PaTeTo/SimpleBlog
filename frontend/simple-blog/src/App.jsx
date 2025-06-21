import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import CreatePost from './pages/PostCreate'
import Header from './components/Header'
import {Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Posts from './pages/Posts'
import MyPosts from './pages/MyPosts.jsx'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/PostEdit.jsx'
import { UserProvider } from './context/userContext.jsx'

function App() {
  const navigate = useNavigate();
  const access = localStorage.getItem("access_token")
  
  const handleLoginButton =()=>{
  if(access!=null){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
  }
  navigate('/login')
  };

  return (
    <>
      <UserProvider>     
        <Header />
        <div className='tray'>
          <div className='actions'>
            <button onClick={() => navigate('/create')}>Create</button>
            <button onClick={() => navigate('/')}>Browse</button>
            <button onClick={() => navigate('/my-posts')}>My Posts</button>
            <button onClick={handleLoginButton}>{access===null?"Log In":"Log Out"}</button>
          </div>
          <div className='content-wrapper'>
            <Routes>
              <Route path="/" element={<Posts public={true}/>} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post-detail/:id" element={<PostDetail />}/>
              <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
          </div>
        
        </div>
      </UserProvider>
    </>
  )
}

export default App
