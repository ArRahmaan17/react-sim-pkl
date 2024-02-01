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
import Push from 'push.js'
import 'react-tiny-fab/dist/styles.css'
import Chats from './pages/User/Chats';
import { useEffect } from 'react';
export default function App(props) {
  // console.log(props)

  const socket = props.dataSocket
  // console.log(socket)
  const router = createBrowserRouter([
    {
      path: "/",
      Component: All,
      children: [
        {
          index: true,
          Component: Register
        }, {
          index: true,
          Component: Chats
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
  useEffect(() => {
    Push.Permission.request();
    socket.on("message_received", (data) => {
      console.log(data)
      Push.create(`Chat From ${data.sender}`, { body: `${data.text} your socket ${socket.id}` });
    });
  }, [socket])
  return (<>
    <RouterProvider router={router} ></RouterProvider>
  </>);
}
function Root() {
  return (
    <Routes>
      <Route path='/' exact Component={All} />
      <Route path='/create-user' exact Component={Register} />
      <Route path='/chats' exact Component={Chats} />
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