import './App.css';
import CreateUser from './pages/CreateUser';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/create-user'>Create User</Link>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/create-user' Component={CreateUser} />
          <Route path='/user/:id' exact Component={User} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
