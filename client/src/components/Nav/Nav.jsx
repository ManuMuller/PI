import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'
import logo from '../../imgs/logo.png'

const Nav = () => {
    return (
        <div className='nav'>
            <div className='nav-logo'>
                <Link to='/home'>
                    <img src={logo} alt='logo' width="100px" />
                </Link>
            </div>
            <Link to='/home'><h1 className='nav-title'>Pi Food</h1></Link>
            <SearchBar />
        </div>
    )
}

export default Nav