import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout.jsx'
import routes from './routes/Router.jsx'
import AuthProvider from './context/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={routes}>
      <RootLayout/>
    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
