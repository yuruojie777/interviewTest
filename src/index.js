import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Contact } from './Contacts';
import { Blog } from './Blog';
import { Tech } from './Tech';
import { Movie } from './Movie';
import { About } from './About';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/ruojie",
        element: <div>Ruojie</div>,
      },
      {
        path: "/blog",
        element: <Blog/>,
      },
      {
        path: "/tech",
        element: <Tech/>,
      },
      {
        path: "/movie",
        element: <Movie/>,
      },
      {
        path: "/about",
        element: <About/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
