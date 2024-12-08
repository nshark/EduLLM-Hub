import Navbar from "../NavbarElements/Navbar"
import LoginPage from "./LoginPage"
import { useState } from "react";
import { usePersistedState } from "./LoginPage";
export default function LandingPage(){

    [window.isLoggedIn, window.setLoggedIn]=usePersistedState<boolean>("isLoggedIn", false);
    [window.username, window.setUserName]=usePersistedState<string>("username",'Bob');
    [window.useremail, window.setUserEmail]=usePersistedState<string>("useremail",'bob@gmail.com');
    const [updateToggle, setUpdateToggle] = useState(false);

    const forceParentUpdate = () => {setUpdateToggle(!updateToggle);};
    return(
    <div>
    <Navbar isLoggedIn={window.isLoggedIn} onLogout={() => {window.isLoggedIn = false; forceParentUpdate();}}/>
    {window.isLoggedIn ? (<>
    <p>Welcome {window.username}</p>
    </>
    ) : ( <LoginPage forceParentUpdate={forceParentUpdate}/> )}
    </div>
    )
}