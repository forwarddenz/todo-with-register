import './App.css';
import Navbar from './Components/Navbar';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';


function App() {

  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
