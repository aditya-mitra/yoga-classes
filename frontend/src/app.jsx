import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AccountInfo from './routes/accounts';
import PaymentsForms from './routes/accounts/payment';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Home from './routes/home';
import PrevPayments from './routes/accounts/prev-payment';

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/account',
    element: <AccountInfo />,
  },
  {
    path: '/account/make-payment',
    element: <PaymentsForms />,
  },
  {
    path: '/account/payments',
    element: <PrevPayments />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
]);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  );
}
