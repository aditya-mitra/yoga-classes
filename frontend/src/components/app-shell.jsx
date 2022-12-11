import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function AppShell({ hideFullSideBar, children }) {
  const sidebar = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const NavItem = (props) => {
    const { icon, route, routeName, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: 'gray.400' }}
        _hover={{
          bg: 'gray.100',
          _dark: { bg: 'gray.900' },
          color: 'gray.900',
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        <Link to={route}>{routeName}</Link>
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{ color: 'white' }}
          fontWeight="semibold"
        >
          Yoga Classes
        </Text>
      </Flex>
      {!hideFullSideBar && (
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem route="/account" routeName="Batch" />
          <NavItem route="/account/make-payment" routeName="Payment" />
        </Flex>
      )}
    </Box>
  );

  return (
    <Box as="section" bg="gray.50" _dark={{ bg: 'gray.700' }} minH="100vh">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="end"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: 'gray.800' }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Button size="sm" onClick={toggleColorMode}>
            {colorMode === 'dark' ? 'Dark' : 'Light'} Mode
          </Button>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
