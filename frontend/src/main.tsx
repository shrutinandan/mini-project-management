import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import React from 'react'
// src/main.tsx
// import "@carbon/react/styles.css";


createRoot(document.getElementById('root')!).render(
//  <React.StrictMode>
  <App />
// </React.StrictMode>

)
