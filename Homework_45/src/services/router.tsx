import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    ErrorBoundary: () => <Navigate to="/" replace={true} />,
    children: [
      {
        path: '/',
        lazy: () => import('../pages/Home/Home'),
      },
      {
        path: '/about',
        lazy: () => import('../pages/About/About'),
      },
      {
        path: '/contacts',
        lazy: () => import('../pages/Contacts/Contacts'),
      },
    ],
  },
]);
