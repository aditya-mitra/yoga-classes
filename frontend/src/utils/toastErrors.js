import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export function toastInfo(title, description, status = 'error') {
  toast({
    title,
    description,
    isClosable: true,
    duration: 3_000,
    status,
  });
}

export function toastApiErrors(errors, title = '') {
  if (!errors) {
    return;
  }

  if (Array.isArray(errors)) {
    errors.forEach((err) => toastInfo(title, err));
  } else {
    toastInfo(errors, title);
  }
}
