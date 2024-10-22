import Navbar from "../NavbarElements/Navbar"
import LoginPage from "./LoginPage"
export default function LandingPage({isLoggedIn} : {isLoggedIn:Boolean}){
    return(
    <div>
    <Navbar isLoggedIn={false} onLogout={() => {}}/>
    {isLoggedIn ? (<>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    </>
    ) : ( <LoginPage/> )}
    </div>
    )
}