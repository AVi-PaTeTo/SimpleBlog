import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import CreatePost from './pages/PostCreate'
import Header from './components/Header'
import {Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'


function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className='tray'>
        <div className='actions'>
          <button onClick={() => navigate('/create')}>Create</button>
          <button onClick={() => navigate('/')}>Browse</button>
          <button onClick={() => navigate('/private-posts')}>Private</button>
          <button onClick={() => navigate('/login')}>Log In</button>
        </div>
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<Posts public={true}/>} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/private-posts" element={<Posts public={false}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/post-detail/:id" element={<PostDetail />}/>
          </Routes>
        </div>
        
      </div>

    </>
  )
}

export default App
