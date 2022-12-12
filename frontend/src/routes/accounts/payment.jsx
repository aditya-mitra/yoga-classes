import { useEffect, useState } from 'preact/hooks';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Radio,
  RadioGroup,
  Center,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import AppShell from '../../components/app-shell';
import { batchApi, paymentApi } from '../../utils/api';
import { toastApiErrors, toastInfo } from '../../utils/toastErrors';
import { getReadableTime } from '../../utils/lib';

const Form1 = ({ formik }) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    batchApi()
      .getAll()
      .then((data) => setBatches(data))
      .catch((err) => toastApiErrors(err.response?.data));
  }, []);

  console.log(formik.values.batchId);

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Select Batch
      </Heading>
      <Flex>
        <RadioGroup
          name={'batchId'}
          value={formik.values.batchId}
          onChange={(val) => formik.setFieldValue('batchId', val)}
        >
          <Stack>
            {batches.map((bat) => (
              <Radio key={bat.id} size="lg" value={bat.id + ''} colorScheme="orange">
                Starts at: {getReadableTime(bat.starting_time)} | Ends at:{' '}
                {getReadableTime(bat.ending_time)}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Flex>
    </>
  );
};

const Form2 = ({ formik }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Enter Payment Amount
      </Heading>

      <FormControl>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Amount
        </FormLabel>
        <Input
          type="text"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

const Form3 = ({ formik }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Complete Payment
      </Heading>
      <Center>
        <Button onClick={formik.handleSubmit} size={'lg'} my={'9'}>
          PAY
        </Button>
      </Center>
    </>
  );
};

export default function PaymentsForms() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const formik = useFormik({
    initialValues: {
      batchId: null,
      amount: 0,
    },
    onSubmit: (values) =>
      paymentApi()
        .create(values)
        .then(() => toastInfo('Payment Successful', null, 'success'))
        .catch((err) => toastApiErrors(err.response?.data)),
  });

  return (
    <AppShell>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
        {step === 1 ? (
          <Form1 formik={formik} />
        ) : step === 2 ? (
          <Form2 formik={formik} />
        ) : (
          <Form3 formik={formik} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </AppShell>
  );
}
