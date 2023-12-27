import './App.css';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import User from './pages/User/User';
import CreateUser from './pages/User/CreateUser';
import All from './pages/User/All';
import ProfileUser from './pages/User/ProfileUser';
import Attendance from './pages/Attendance/Attendance';

const router = createBrowserRouter([
  {
    path: "/",
    Component: All,
    children: [
      {
        index: true,
        Component: CreateUser
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
      <Route path='/create-user' Component={CreateUser} />
      <Route path='/user/:id' exact Component={User} />
      <Route path='/user/:id/update' exact Component={ProfileUser} />
      <Route path='/attendance' exact Component={Attendance} />
    </Routes>);
}