import './App.css';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Push from 'push.js'
import 'react-tiny-fab/dist/styles.css'
import Chats from './pages/User/Chats';
import { socketContext } from './helpers/context';
import { useEffect, useContext } from 'react';
export default function App() {
  const socket = useContext(socketContext);
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Chats,
    },
    {
      path: "*",
      Component: Root
    }
  ]);
  useEffect(() => {
    Push.Permission.request();
    socket.on("message_received", (data) => {
      Push.create(`${data[data.length - 1].sender}`, { body: `${data[data.length - 1].text}` });
    });
  }, [socket])
  return (<>
    <RouterProvider router={router} ></RouterProvider>
  </>);
}
function Root() {
  return (
    <Routes>
      <Route path='/' exact Component={Chats} />
      <Route path='/register' exact Component={Register} />
      <Route path='/login' exact Component={Login} />
    </Routes>
  );
}