import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AccountInfo from './routes/accounts';
import PaymentsForms from './routes/accounts/payment';
import Login from './routes/auth/login';
import Register from './routes/auth/register';

const router = createBrowserRouter([
  {
    path: '/account',
    element: <AccountInfo />,
  },
  {
    path: '/account/make-payment',
    element: <PaymentsForms />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
