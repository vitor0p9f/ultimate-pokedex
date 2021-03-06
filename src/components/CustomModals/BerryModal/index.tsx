import ImageCard from '@/components/ImageCard'
import { BerryProps } from '@/types/globalTypes'
import { Divider, Flex, SimpleGrid, Stack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { memo } from 'react'
import ModalSchema from '../ModalSchema'

interface ComponentProps {
  data: BerryProps
}

const BerryModalComponent: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} cursorPointer={true} />

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <SimpleGrid columns={2} spacing="10%" width="100%" alignItems="center" display="flex">
          <Image src={data.sprite} alt={data.name} width="100%" height="100%" />

          <Stack display="flex" justifyContent="center" alignItems="center" width={['60%', '100%']} alignSelf="center">
            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Firmness:</Text>
              <Text>{data.firmness}</Text>
            </Flex>

            <Divider variant="dashed" />

            <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="100%">
              <Text>Growth Time:</Text>
              <Text>{data.growthTime}</Text>
            </Flex>

            <Divider variant="dashed" />

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
              <Tr key={flavor.name}>
                <Td textAlign="center">{flavor.name}</Td>
                <Td textAlign="center">{flavor.potency}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ModalSchema>
    </>
  )
}

const BerryModal = memo(BerryModalComponent)

export default BerryModal
