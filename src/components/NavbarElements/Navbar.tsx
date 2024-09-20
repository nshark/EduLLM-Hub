
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css'
import { Dropdown } from 'react-bootstrap';

interface chat {
    text: string;
    id: string;
}

const Navbar = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: (e: React.MouseEvent) => void }) => {
    //TODO Change this to access the database and requisition the resquite chats that this student has been assignened.
    const [chats] = useState<chat[]>([{text: "Linear Alegebra", id: "2md3m43k"}]);


    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={onLogout} className="nav-link">Logout</button>
                        </li>
                        <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Chats
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {chats.map((element) => (<Dropdown.Item className="dropdown" href={"/chats/id="+element["id"]}>{element["text"]}</Dropdown.Item>))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;