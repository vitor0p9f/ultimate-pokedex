import Logo from '@/public/img/icons/PokePoint.svg'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const DrawerItems = [{
  name: 'Home',
  link: '/'
}, {
  name: 'Berries',
  link: '/berries'
},
{
  name: 'Items',
  link: '/items'
},
{
  name: 'Regions',
  link: '/regions'
},
{
  name: 'Natures',
  link: '/natures'
}]

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Flex width="100%">
        <Button
          as={IconButton} icon={<HamburgerIcon />}
          onClick={onOpen} ref={btnRef}
          margin="1%" justifySelf="flex-start"
          borderRadius="5px" bgColor="#E0E0E0" _hover={{
            bgColor: '#BDBDBD'
          }}
        />
      </Flex>

      <Drawer
        isOpen={isOpen} placement="left"
        onClose={onClose} finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent fontSize={['sm', 'md', 'lg']} bgColor="#FAFAFA" color="#22252A">
          <DrawerCloseButton />

          <DrawerHeader display="flex" alignSelf="center" fontFamily="Pokemon Solid" justifyContent="space-between" width="80%" marginRight="6%">
            <Text>Ultimate</Text>
            <Image src={Logo} alt="Logo" width="30%" height="30%" />
            <Text>Pokédex</Text>
          </DrawerHeader>

          <DrawerBody padding="0">
            {DrawerItems.map(item => (
              <Link href={item.link} key={item.name}>
                <Box padding="0.5em 1em" cursor="pointer" width="100%" marginTop="0.5em" marginBottom="0.5em" onClick={onClose}
                  _hover={{
                    bgColor: '#E0E0E0'
                  }}
                >
                  {item.name}
                </Box>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
