import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <navbar className="app-navbar">
            <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Messages</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
        </navbar>
    );
}

export default Navbar;