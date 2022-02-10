import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {

    const { logout, isLogin } = useContext(AuthContext);

    return (
        <nav>
            <div className="navbar nav-wrapper blue">
                <a href="/" className="brand-logo">MERN ToDo App</a>
                {
                    isLogin ? <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/" onClick={logout}>Выйти</a></li>
                    </ul>
                        : <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Войти</a></li>
                        </ul>
                }
            </div>
        </nav>
    );
}
