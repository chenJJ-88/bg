import { useState } from 'react'
import reactLogo from './assets/react.svg'
import RootRoutes from '@/routes/routes.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
function App() {
  return (
    // <>
    //   <div>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <div className="box"></div>
    // </>
    RootRoutes()
  )
}

export default App
