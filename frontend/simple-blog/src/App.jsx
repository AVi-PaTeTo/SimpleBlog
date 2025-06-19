import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import CreatePost from './pages/PostCreate'
import Header from './components/Header'
import {Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'
import DeletePopUp from './components/DeletePopUp.jsx'
import { UserProvider } from './context/userContext.jsx'

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <UserProvider>     
        <Header />
        <div className='tray'>
          <div className='actions'>
            <button onClick={() => navigate('/create')}>Create</button>
            <button onClick={() => navigate('/')}>Browse</button>
            <button onClick={() => navigate('/my-posts')}>My Posts</button>
            <button onClick={() => navigate('/login')}>Log In</button>
          </div>
          <div className='content-wrapper'>
            <Routes>
              <Route path="/" element={<Posts public={true}/>} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/my-posts" element={<Posts public={false}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/post-detail/:id" element={<PostDetail />}/>
            </Routes>
          </div>
        
        </div>
      </UserProvider>
    </>
  )
}

export default App
