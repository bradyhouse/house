import 'bootswatch/dist/superhero/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'shepherd.js/dist/css/shepherd.css'
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
