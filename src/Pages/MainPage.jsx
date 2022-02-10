import React, { useState, useContext, useCallback, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function MainPage() {

    const [text, setText] = useState('')
    const { userId } = useContext(AuthContext)
    const [todos, setTodos] = useState([])



    const getTodos = useCallback(async () => {
        try {
            await axios.get('https://todo-with-register.herokuapp.com/api/todo/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { userId }
            }).then(response => setTodos(response.data))
        } catch (err) {
            console.log(err)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if (!text) return null
        try {
            await axios.post('https://todo-with-register.herokuapp.com/api/todo/add', { text, userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setTodos([...todos, response.data])
                setText('')
                getTodos()
            })
        } catch (err) {
            console.log(err)
        }
    }, [text, userId, todos, getTodos])

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`https://todo-with-register.herokuapp.com/api/todo/delete/${id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => getTodos())
        } catch (err) {
            console.log(err)
        }
    }, [getTodos])



    const complitedTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://todo-with-register.herokuapp.com/api/todo/complited/${id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setTodos([...todos], response.data)
                getTodos()
            })
        } catch (err) {
            console.log(err)
        }
    }, [getTodos, todos])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://todo-with-register.herokuapp.com/api/todo/important/${id}`, { id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setTodos([...todos], response.data)
                getTodos()
            })
        } catch (err) {
            console.log(err)
        }
    }, [getTodos, todos])

    useEffect(() => {
        getTodos()
    }, [getTodos])

    return <div className="container">
        <div className="main-page">
            <h4>Добавить задачу</h4>
            <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" id='text' name='input' className="validate" onChange={(e) => setText(e.target.value)} value={text} />
                        <label htmlFor="input">Задача:</label>
                    </div>
                </div>
                <div className="row">
                    <button className="waves-effect waves-light btn blue" onClick={createTodo}>Добавить</button>
                </div>
            </form>
            <h3>Активные задачи:</h3>
            <div className="todos">
                {
                    todos.map((todo, index) => {
                        let cls = ['row flex todos-item']
                        if (todo.complited) {
                            cls.push('complited')
                        }

                        if (todo.important) {
                            cls.push('important')
                        }

                        return (
                            <div className={cls.join(' ')} key={index}>
                                <div className="col todos-num">{index + 1}</div>
                                <div className="col todos-text">{todo.text}</div>
                                <div className="todos-buttons col">
                                    <i className="material-icons blue-text check-icon" onClick={() => complitedTodo(todo._id)}>check</i>
                                    <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                    <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    </div >
}

export default MainPage;
