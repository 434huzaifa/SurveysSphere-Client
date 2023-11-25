import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Auth from './Auth';
const qc = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
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
