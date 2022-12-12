import { Box, Flex, chakra, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'preact/hooks';

import AppShell from '../../components/app-shell';
import { paymentApi } from '../../utils/api';
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
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    paymentApi()
      .getAll()
      .then((data) => setPaymentsData(data))
      .catch((err) => toastApiErrors(err.response?.data));
  }, []);

  return (
    <AppShell>
      <Flex
        bg="#edf3f8"
        _dark={{ bg: '#3e3e3e' }}
        p={50}
        w="full"
        flexDir={'column'}
        alignItems="center"
        justifyContent="center"
      >
        {paymentsData.map((pay) => (
          <Box
            key={pay.id}
            w="sm"
            mx="auto"
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            mb="7"
          >
            <Box py={4} px={6}>
              <Details name="Batch ID" value={pay.batch} />
              <Details name="Amount" value={`INR ${pay.amount}`} />
              <Details name="Paid At" value={getReadableDate(pay.created_at)} />
            </Box>
          </Box>
        ))}
      </Flex>
    </AppShell>
  );
}
