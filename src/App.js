import './App.css';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import User from './pages/User/User';
import Register from './pages/Auth/Register';
import All from './pages/User/All';
import ProfileUser from './pages/User/ProfileUser';
import Attendance from './pages/Attendance/Attendance';
import Login from './pages/Auth/Login';
import Tasks from './pages/Mentor/Tasks';
import CreateTask from './pages/Mentor/CreateTask';
import Task from './pages/Mentor/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateTask from './pages/Mentor/UpdateTask';

const router = createBrowserRouter([
  {
    path: "/",
    Component: All,
    children: [
      {
        index: true,
        Component: Register
      },
      {
        index: true,
        Component: User
      },
      {
        index: true,
        Component: ProfileUser
      },
      {
        index: true,
        Component: Attendance
      }, {
        index: true,
        Component: Tasks
      },
    ]
  },
  {
    path: "*",
    Component: Root
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
function Root() {
  return (
    <Routes>
      <Route path='/' Component={All} />
      <Route path='/create-user' Component={Register} />
      <Route path='/user/:id' exact Component={User} />
      <Route path='/user/:id/update' exact Component={ProfileUser} />
      <Route path='/attendance' exact Component={Attendance} />
      <Route path='/mentor/create-task' exact Component={CreateTask} />
      <Route path='/mentor/task' exact Component={Tasks} />
      <Route path='/mentor/task/:id' exact Component={Task} />
      <Route path='/mentor/task/:id/update' exact Component={UpdateTask} />
      <Route path='/login' exact Component={Login} />
    </Routes>);
}