import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPageElements/LandingPage'




declare global {
  interface Window {
    google: any;
    isLoggedIn: boolean
    username: string
    useremail: string
    setUserEmail: (arg0: string) => void
    setUserName: (arg0: string) => void
    setLoggedIn: (arg0: boolean) => void
  }
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
