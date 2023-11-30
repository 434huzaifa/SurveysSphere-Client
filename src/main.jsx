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
import Payments from './Dashboard/Payments';
import SurveyManager from './Dashboard/SurveyManager';
import UserManeger from './Dashboard/UserManager';
import Reported from './Dashboard/Reported';
import DashboardHome from './Dashboard/DashboardHome';
import AllResponses from './Dashboard/AllResponses';
import UpdateSurvey from './UpdateSurvey';
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
        element:<Private permission={["Surveyor","Admin"]}><AddSurvey></AddSurvey></Private>
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
        element: <Pro></Pro>
      },
      {
        path:"/survey",
        element: <Private permission={["Surveyor"]}><SurveyManager admin={false}></SurveyManager></Private>
      },
      {
        path:"/surveyresponse/:id",
        element:<AllResponses permission={["Surveyor"]}></AllResponses>
      },
      {
        path:"/updatesurvey/:id",
        element:<Private permission={["Surveyor"]}><UpdateSurvey></UpdateSurvey></Private>
      },
      {
        path:'/dashboard',
        element:<Private permission={["Admin"]}> <Dashboard></Dashboard></Private>,
        children:[
          {
            path:"/dashboard",
            element:<Private permission={["Admin"]}><DashboardHome></DashboardHome></Private>
          },
          {
            path:"/dashboard/payment",
            element:<Private permission={["Admin"]}><Payments></Payments></Private>
          },
          {
            path:"/dashboard/survey",
            element:<Private permission={["Admin"]}><SurveyManager admin={true}></SurveyManager></Private>
          },
          {
            path:"/dashboard/user",
            element:<Private permission={["Admin"]}><UserManeger></UserManeger></Private>
          },
          {
            path:"/dashboard/surveyresponse/:id",
            element:<Private permission={["Admin"]}><AllResponses></AllResponses></Private>
          },
          {
            path:"/dashboard/reported",
            element:<Private permission={["Admin"]}><Reported></Reported></Private>
          }
        ]
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
