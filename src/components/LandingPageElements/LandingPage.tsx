import Navbar from "../NavbarElements/Navbar"
import LoginPage from "./LoginPage"
import { useState } from "react";
export default function LandingPage(){
    const [updateToggle, setUpdateToggle] = useState(false);

    const forceParentUpdate = () => {
    setUpdateToggle(!updateToggle);
    };
    return(
    <div>
    <Navbar isLoggedIn={window.isLoggedIn} onLogout={() => {window.isLoggedIn = false; forceParentUpdate();}}/>
    {window.isLoggedIn ? (<>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    </>
    ) : ( <LoginPage forceParentUpdate={forceParentUpdate}/> )}
    </div>
    )
}