import ImageCard from '@/components/ImageCard'
import { PokemonProps } from '@/types/globalTypes'
import { Image, Stack, useDisclosure } from '@chakra-ui/react'
import { memo } from 'react'
import ModalSchema from '../ModalSchema'

type ComponentProps = {
  data: PokemonProps
}

const PokemonModalComponent: React.FC<ComponentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ImageCard data={data} onOpen={onOpen} animation={true} cursorPointer={true} />

      <ModalSchema isOpen={isOpen} onClose={onClose} headerText={data.name}>
        <Image src={data.sprite} alt={data.name} width="80%" height="80%" margin="0"></Image>
        <Stack>
        </Stack>
      </ModalSchema>
    </>
  )
}

const PokemonModal = memo(PokemonModalComponent)

export default PokemonModal
