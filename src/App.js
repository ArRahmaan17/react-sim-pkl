import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './pages/User/User';
import CreateUser from './pages/User/CreateUser';
import Index from './pages/User/Index';
import ProfileUser from './pages/User/ProfileUser';
// import ProfileUser from './pages/ProfileUser';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/create-user'>Create User</Link>
        </div>
        <Routes>
          <Route path='/' Component={Index} />
          <Route path='/create-user' Component={CreateUser} />
          <Route path='/user/:id' exact Component={User} />
          <Route path='/user/:id/update' exact Component={ProfileUser} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
