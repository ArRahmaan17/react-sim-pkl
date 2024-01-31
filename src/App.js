import './App.css';
import { createBrowserRouter, Route, RouterProvider, Routes, useNavigate } from 'react-router-dom'
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
import Push from 'push.js'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfo, faMessage } from '@fortawesome/free-solid-svg-icons';
import Chats from './pages/User/Chats';

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
]);

export default function App() {
  useEffect(() => {
    Push.Permission.request();
    // Push.create("Welcome aboard captain", {
    //   body: "test notification",
    //   timeout: 2500,
    //   requireInteraction: true,
    // });
  });
  return (<>
    <Fab icon={<FontAwesomeIcon icon={faMessage} />} event='click' onClick={() => { console.log('test') }} />
    <RouterProvider router={router} /></>)
}
function Root() {
  return (
    <Routes>
      <Route path='/' Component={All} />
      <Route path='/create-user' Component={Register} />
      <Route path='/chats' Component={Chats} />
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