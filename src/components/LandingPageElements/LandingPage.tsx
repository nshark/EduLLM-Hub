import Navbar from "../NavbarElements/Navbar"
export default function LandingPage(){
    return(
    <div>
    <Navbar isLoggedIn={true} onLogout={() => {}}/>

    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    <p>Hello World</p>
    </div>
    )
}