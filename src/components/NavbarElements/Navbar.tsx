
import React, { useState } from 'react';
import './dropdown.css'
import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as Navbar_Boostrap } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

interface chat {
    text: string;
    id: string;
}

function Navbar({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: (e: React.MouseEvent) => void }) {
    //TODO Change this to access the database and requisition the resquite chats that this student has been assignened.
    const [chats] = useState<chat[]>([{ text: "Linear Algebra", id: "2md3m43k" }, { text: "Advanced AI", id: "24kjro5" }]);


    return (
        <Navbar_Boostrap expand='lg' className='Navbar-Main' sticky='top'>
            <Container>
                <Navbar_Boostrap.Brand href="/">EduLLM Hub</Navbar_Boostrap.Brand>
                { isLoggedIn ? (
                <Nav className='nav-main'>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <NavDropdown title="Chats" id="collapsible-nav-dropdown">
                        {chats.map((element) => {return(<NavDropdown.Item href={"/chats?id="+element.id}>{element.text}</NavDropdown.Item>)})}
                    </NavDropdown>
                    <Button onClick={onLogout}>Logout</Button>
                </Nav>) : (
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                )
                }
            </Container>
        </Navbar_Boostrap>
    );
};

export default Navbar;