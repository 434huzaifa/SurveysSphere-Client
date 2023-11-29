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
import AddSurvey from './AddSurvey';
import Details from './Details';
import SurveyPage from './SurveyPage';
import Pro from "./Pro"
import Dashboard from './Dashboard/Dashboard';
import Private from './Private';
import EelementError from './EelementError';
const qc = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<EelementError/>,
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
        element:<Private><AddSurvey></AddSurvey></Private>
      },
      {
        path:"/details/:id",
        element:<Details></Details>
      },
      {
        path:"/allsurvey",
        element:<SurveyPage></SurveyPage>
      },
      {
        path:'/pro',
        element:<Pro></Pro>
      },
      {
        path:'/dashboard',
        element:<Dashboard></Dashboard>
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
