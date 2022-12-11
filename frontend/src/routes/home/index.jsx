import { Center, CircularProgress } from '@chakra-ui/react';

export default function Home() {
  return (
    <Center height={'100vh'}>
      <CircularProgress size="80px" isIndeterminate color="green.300" />
    </Center>
  );
}
