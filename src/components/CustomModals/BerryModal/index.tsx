import ImageCard from '@/components/ImageCard'
import { BerryProps } from '@/types/globalTypes'
import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'

interface ComponentProps {
  data: BerryProps
}

const BerryModal: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay />

        <ModalContent fontSize={['sm', 'md', 'lg']} marginLeft="5%" marginRight="5%">
          <ModalHeader textAlign="center">{data.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column" justifyContent="center">
            <SimpleGrid columns={2} spacing="10%" width="100%" alignItems="center" display="flex">
              <Image src={data.sprite} alt={data.name} margin="0" width="100%" height="100%" alignSelf="center" />

              <Stack display="flex" justifyContent="center" alignItems="center" width={['60%', '100%']} alignSelf="center">
                <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
                  <Text>Firmness:</Text>
                  <Text>{data.firmness}</Text>
                </Flex>

                <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
                  <Text>Growth Time:</Text>
                  <Text>{data.growthTime}</Text>
                </Flex>

                <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
                  <Text>Max Harvest:</Text>
                  <Text>{data.maxHarvest}</Text>
                </Flex>
              </Stack>
            </SimpleGrid>

            <Table variant="simple" marginTop="5%">
              <TableCaption placement="top">Flavors</TableCaption>

              <Thead>
                <Tr>
                  <Th textAlign="center">Name</Th>
                  <Th textAlign="center">Potency</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data.flavors.map(flavor => (
                  <Tr key="">
                    <Td textAlign="center">{flavor.name}</Td>
                    <Td textAlign="center">{flavor.potency}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BerryModal
