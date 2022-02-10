import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import AuthPage from './Pages/AuthPage';

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return <Switch>
            <Route path='/' exact component={MainPage} />
            <Redirect to='/' />
        </Switch>
    }

    return <Switch>
        <Route path='/login' exact component={AuthPage} />
        <Redirect to='/login' />
    </Switch>
}