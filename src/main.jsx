import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,

} from 'react-router-dom';
import CartPage from './Pages/CartPage';
import ErrorPage from './Pages/ErrorPage';
import Root from './Pages/Root';
import StorePage from './Pages/StorePage';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
import WhiteListPage from './Pages/WhiteListPage';
import ProductListPage from './Pages/ProductListPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <StorePage />,
      },
      {
        path: "/cart",
        element: <CartPage />
      }
    ]
  }, {
    path: "/login",
    element: <LoginPage />
  }, {
    path: "/admin",
    element: <AdminPage />,
  }, {
    path: "/admin/whiteList",
    element: <WhiteListPage />
  }, {
    path: "/admin/products",
    element: <ProductListPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
