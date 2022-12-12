import { Center, CircularProgress } from '@chakra-ui/react';
import { useEffect } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
import { accountApi } from '../../utils/api';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    accountApi()
      .retrieve()
      .then(() => navigate('/account'))
      .catch(() => navigate('/login'));
  }, []);

  return (
    <Center height={'100vh'}>
      <CircularProgress size="80px" isIndeterminate color="green.300" />
    </Center>
  );
}
