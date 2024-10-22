import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPageElements/LandingPage'

declare global {
  interface Window {
    google: any;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage isLoggedIn={false}/>,
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
