import Logo from '@/public/img/icons/PokePoint.svg'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
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
},
{
  name: 'Moves',
  link: '/moves'
}]

const Navbar: React.FC = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Flex width="100%">
        <Button
          as={IconButton} icon={<HamburgerIcon />}
          onClick={onOpen} ref={btnRef}
          margin="1%" justifySelf="flex-start"
          borderRadius="5px" bgColor="#EEEEEE" _hover={{
            bgColor: '#DDDDDD'
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
            <Text>Pokedex</Text>
          </DrawerHeader>

          <DrawerBody padding="0">
            {DrawerItems.map(item => (
              <Box key="" padding="0.5em 1em" cursor="pointer" width="100%" marginTop="0.5em" marginBottom="0.5em" onClick={() => { router.push(item.link, undefined, { shallow: true }) }} _hover={{
                bgColor: '#DDDDDD'
              }}>{item.name}</Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
