import './App.css'
import MainPage from './pages/mainPage/mainPage';

import PhotoPage from './pages/photoPage/PhotoPage'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="container">
        <h1>Image Gallery</h1>

        <Routes>
          <Route  path="/" element={<MainPage/>}/>
          <Route  path="/photo/:id" element={<PhotoPage/>}/>
        </Routes>
        
      </div>
    </Router>
  )
}

export default App
