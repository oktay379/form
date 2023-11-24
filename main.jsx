import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


// Bootstrap kullanmak icin bu sekilde import edilmis oldu
// Oncesinde terminal aktarildi
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



