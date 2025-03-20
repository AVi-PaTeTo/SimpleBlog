import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import CreatePost from './pages/PostCreate'
import Header from './components/Header'
import {Link, Route, Routes, useNavigate } from 'react-router-dom'
import Posts from './pages/Posts'


function App() {
  const navigate = useNavigate();

  function handleClick(value){
   navigate(`/${value}`)
  }

  return (
    <>
      <Header />
      <div className='tray'>
        <div className='actions'>
          <button onClick={() => navigate('/create')}>Create</button>
          <button onClick={() => navigate('/')}>Browse</button>
          <button onClick={() => navigate('/private-posts')}>Private</button>
        </div>
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/private-posts" element={<Posts />} />
          </Routes>
        </div>
        
      </div>

    </>
  )
}

export default App
