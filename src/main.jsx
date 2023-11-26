import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Auth from './Auth';
import Home from './Home/Home';
import Register from './Register';
import Login from './Login';
import AddSurvey from '../AddSurvey';
import Details from './Details';
const qc = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path:"/",
        element:<Home></Home>
      },  
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/addsurvey",
        element:<AddSurvey></AddSurvey>
      },
      {
        path:"/details/:id",
        element:<Details></Details>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <Auth>
      <RouterProvider router={router} />
      <Outlet></Outlet>
      </Auth>
    </QueryClientProvider>
  </React.StrictMode>,
)
