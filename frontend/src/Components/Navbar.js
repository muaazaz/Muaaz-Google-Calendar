import { Link, useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { getCookiesData, removeCookiesData } from '../Utils/cookies';
import { useState } from 'react';

const Navbar = () => {
    const history = useHistory(),
        [email, setEmail] = useState(''),
        [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const { email} = getCookiesData()

        setEmail(email)
        if(email){
            setLoggedIn(true)
        }

    }, [loggedIn])
    return (
        <nav className="navbar">
            <img src="" alt="" />
            <ul className='list'>
                <li>
                    <Link to='/' className='lnk1' refresh='true'><img src="/logo.png" alt="" /></Link>
                </li>
                {
                    loggedIn ?
                        <>
                            <li>
                                <span className='eml'>Welcome ! {email}</span>
                            </li>
                            <li>
                                <Link className='crt lnk' to='/create/event'>Create Event</Link>
                            </li>
                            <li>
                                <button className='lgot' onClick={() => {
                                    removeCookiesData()
                                    setLoggedIn(false)
                                    history.push("/");
                                }}>Log Out</button>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link className='sgn lnk' to='/signup'>Sign Up</Link>
                            </li>
                            <li>
                                <Link className='lgin lnk' to='/login'>Log In</Link>
                            </li>
                        </>
                }
            </ul>
        </nav>
    );
}

export default Navbar;