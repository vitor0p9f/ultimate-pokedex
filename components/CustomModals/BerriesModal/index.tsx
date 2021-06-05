import { Box, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

interface BerryFlavorProps {
  name: string
  potency: number
}

interface BerryProps {
  id: number
  name: string
  sprite: string
  firmness: string
  maxHarvest: number
  growthTime: number
  flavors: BerryFlavorProps[]
}

interface ComponentProps {
  data: BerryProps
}

const BerriesModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box key={data.id} cursor="pointer"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center" onClick={onOpen} _hover={{
          backgroundColor: '#666666'
        }}>

        <Image src={data.sprite} alt={data.name} width="100%" height="100%" />
        <Text>{data.name}</Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{data.name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column">
            <Image src={data.sprite} alt={data.name} width="5rem" height="5rem" margin="0"></Image>
            <Stack>
              <Text>Firmness: {data.firmness}</Text>
              <Text>Growth Time: {data.growthTime}</Text>
              <Text>Max Harvest: {data.maxHarvest}</Text>
              {data.flavors.length > 1
                ? <>
                  <Text>Flavors</Text>
                  {data.flavors.map(flavor => (
                    <Stack key="">
                      <Text>Name: {flavor.name}</Text>
                      <Text>Potency: {flavor.potency}</Text>
                    </Stack>
                  ))}
                </>
                : <>
                  <Text>Flavor</Text>
                  <Stack>
                    <Text>Name: {data.flavors[0].name}</Text>
                    <Text>Potency: {data.flavors[0].potency}</Text>
                  </Stack>
                </>}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BerriesModal
