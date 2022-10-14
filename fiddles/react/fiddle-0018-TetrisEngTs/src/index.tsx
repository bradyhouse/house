import 'bootswatch/dist/sketchy/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
import { createRoot } from "react-dom/client"
import './index.css'
import App from './App'

const container: any = document.getElementById("root")
const root = createRoot(container)


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
