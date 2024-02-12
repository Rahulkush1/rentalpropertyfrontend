import React from 'react'
import Button from '@mui/material/Button';
import './Navbar.css'
import { useSelector } from 'react-redux';


function Navbar(    ) {
    const navVisibility = window.location.pathname === '/login' || window.location.pathname === '/signup' ? {
        position: 'unset'
    } : {
        position: 'sticky',
        top: '0',
        zIndex: '1020'
    }
    const {userdetail , isAuthenticated , loading} = useSelector(state => state.user)

  return (
    <>
        <nav className='navbar navbar-expand-lg sticky-top navbar-dark py-3 ' style={navVisibility} >
        <div className="container-fluid">
            <a className="navbar-brand" href="/">RentalProperty</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                <a className="nav-link active nav-link-ltr" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link nav-link-ltr" href="/properties">Property</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/">Action</a></li>
                    <li><a className="dropdown-item" href="/">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                </ul>
                </li>
            </ul>
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
                {isAuthenticated  ? (
                    <>
                    <li className="nav-item">
                        <Button href="/login" variant="outlined" color='success'  style={{color: "white"}}>Logout</Button>
                    </li>
                    </>
                ): (
                    <> 
                    <li className="nav-item">
                        <Button href="/login" variant="outlined" color='success'  style={{color: "white"}}>Login</Button>
                    </li>
                    <li className="nav-item">
                        <Button href='/signup' variant="outlined" color='success'  style={{color: "white", marginLeft: '5px'}}>SignUp</Button>
                    </li>
                    </>
                )}
            </ul>
            </div>
        </div>
        </nav>
    </>
  )
}

export default Navbar

