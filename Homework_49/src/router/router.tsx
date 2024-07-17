import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Skills from '../pages/Skills';
import Education from '../pages/Education';
import Projects from '../pages/Projects';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/skills',
        element: <Skills />,
      },
      {
        path: '/education',
        element: <Education />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
    ],
  },
]);
