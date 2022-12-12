import { Box, Flex, chakra, Spacer } from '@chakra-ui/react';

import AppShell from '../../components/app-shell';
import { useEffect, useState } from 'preact/hooks';
import { accountApi } from '../../utils/api';
import { toastApiErrors } from '../../utils/toastErrors';
import { getReadableDate } from '../../utils/lib';

function Details({ name, value }) {
  return (
    <>
      <Flex>
        <chakra.h1
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          _dark={{ color: 'white' }}
        >
          {name} :
        </chakra.h1>
        <Spacer />
        <chakra.h1 fontSize="xl" color="gray.800" _dark={{ color: 'white' }}>
          {value}
        </chakra.h1>
      </Flex>
    </>
  );
}

export default function AccountInfo() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    accountApi()
      .retrieve()
      .then((data) => setUserData(data))
      .catch((err) => toastApiErrors(err.response?.data));
  }, []);


  return (
    <AppShell>
      <Flex
        bg="#edf3f8"
        _dark={{ bg: '#3e3e3e' }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="sm"
          mx="auto"
          bg="white"
          _dark={{ bg: 'gray.800' }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <Flex alignItems="center" px={6} py={3} bg="gray.900">
            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
              {userData.name}
            </chakra.h1>
          </Flex>

          <Box py={4} px={6}>
            <Details name="Age" value={userData.age} />
            <Details
              name="Member Since"
              value={getReadableDate(userData.created_at)}
            />
            <Details name="Batch No" value={userData.batch} />
          </Box>
        </Box>
      </Flex>
    </AppShell>
  );
}
