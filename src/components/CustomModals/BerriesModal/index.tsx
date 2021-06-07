import { BerryProps } from '@/types/globalTypes'
import {
  Box, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react'

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="outside">
        <ModalOverlay />

        <ModalContent width="40%">
          <ModalHeader textAlign="center">{data.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column" justifyContent="space-between">
            <Flex flexDir="row">
              <Image src={data.sprite} alt={data.name} width="40%" height="40%" margin="0" alignSelf="center" />

              <Stack display="flex" justifyContent="center" width="50%">
                <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                  <Text>Firmness:</Text>
                  <Text>{data.firmness}</Text>
                </Flex>

                <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                  <Text>Growth Time:</Text>
                  <Text>{data.growthTime}</Text>
                </Flex>

                <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                  <Text>Max Harvest:</Text>
                  <Text>{data.maxHarvest}</Text>
                </Flex>
              </Stack>

            </Flex>

            <Table variant="simple">
              <TableCaption placement="top" >Flavors</TableCaption>

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

export default BerriesModal
