import React, { useState, useContext } from 'react';
import { Switch, Route, Link, BrowserRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const AuthPage = () => {

    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const { login } = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            await axios.post('https://todo-with-register.herokuapp.com/api/auth/register', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://todo-with-register.herokuapp.com/api/auth/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth__page">
                            <div className="row">
                                <Route path="/login">
                                    <h3>Авторизация</h3>
                                    <form className="col s12 form-login" onSubmit={e => e.preventDefault()}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={changeHandler} name="email" id="email" type="email" className="validate" />
                                                <label>Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={changeHandler} name="password" id="password" type="password" className="validate" />
                                                <label>Password</label>
                                            </div>
                                        </div>
                                        <div className="row btns">
                                            <button className='wawes-effect wawes-light btn btn blue btn-login' onClick={loginHandler}>
                                                Войти
                                            </button>
                                            <Link to="/register" className="btn-outline btn-reg">Нет аккаунта?</Link>
                                        </div>
                                    </form>
                                </Route>

                                <Route path="/register">
                                    <h3>Регистрация</h3>
                                    <form className="col s12 form-login" onSubmit={e => e.preventDefault()}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={changeHandler} name="email" id="email" type="email" className="validate" />
                                                <label>Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={changeHandler} name="password" id="password" type="password" className="validate" />
                                                <label>Password</label>
                                            </div>
                                        </div>
                                        <div className="row btns">
                                            <button className='wawes-effect wawes-light btn blue btn-login' onClick={registerHandler}>
                                                Регистрация
                                            </button>
                                            <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                                        </div>
                                    </form>
                                </Route>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage;
