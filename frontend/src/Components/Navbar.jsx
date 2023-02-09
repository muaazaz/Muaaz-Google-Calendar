import { Link, useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/user/userAction';

const Navbar = () => {
    const history = useHistory(),
        dispatch = useDispatch(),
        data = useSelector((state)=>state.userValidation),
        [email, setEmail] = useState(''),
        [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setEmail(data.email)
        if(data.token){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
    }, [data,email])
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
                                    dispatch(logOut())
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