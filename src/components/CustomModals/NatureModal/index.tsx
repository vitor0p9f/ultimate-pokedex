import TextCard from '@/components/TextCard'
import { NatureProps } from '@/types/globalTypes'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Divider, Flex, List, ListIcon, ListItem, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { memo } from 'react'
import ModalSchema from '../ModalSchema'

type ComponentProps = {
  data: NatureProps
}

const NatureModalComponent: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TextCard key={data.id} onClick={onOpen}>
        {data.name}
      </TextCard>

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <Stack>
          <Text>Name: {data.name}</Text>

          <Divider variant="dashed" />

          <Stack>
            <Text>Increased Stats: {data.increasedStat}</Text>
            <Text>Decreased Stats: {data.decreasedStat}</Text>
          </Stack>

          <Divider variant="dashed" />

          <Stack>
            <Text>Likes Flavor: {data.likesFlavor}</Text>
            <Text>Hates Flavor: {data.hatesFlavor}</Text>
          </Stack>

          <Divider variant="dashed" />

          <Flex direction="column" alignItems="flex-start" justifyContent="space-between" width="100%">
            <Text>Status Change:</Text>

            <List spacing={3} marginTop="10px">
              {data.statusChange.map((status, index) => (
                <>
                  <ListItem key={status.name} display="flex">
                    <ListIcon as={ChevronRightIcon} color="green.500" />

                    <Stack>
                      <Text>Name: {status.name}</Text>
                      <Text>Max Change: {status.maxChange}</Text>
                    </Stack>
                  </ListItem>
                  {index === (data.statusChange.length - 1) ? null : <Divider variant="dashed" />}
                </>
              ))}
            </List>
          </Flex>

        </Stack>
      </ModalSchema>
    </>
  )
}

const NatureModal = memo(NatureModalComponent)

export default NatureModal
