import { useFormik } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'preact/hooks';
import { authApi } from '../../utils/api';
import AppShell from '../../components/app-shell';

import { toastApiErrors } from '../../utils/toastErrors';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      authApi()
        .login(values)
        .then(() => navigate('/account'))
        .catch((error) => {
          toastApiErrors(error.response?.data);
          setLoading(false);
        });
    },
  });

  return (
    <AppShell hideFullSideBar={true}>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  values={formik.values.password}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={formik.handleSubmit}
                  disabled={loading}
                >
                  Login
                </Button>
                <Button variant="outline" onClick={() => navigate('/signup')}>
                  Create New Account
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </AppShell>
  );
}
