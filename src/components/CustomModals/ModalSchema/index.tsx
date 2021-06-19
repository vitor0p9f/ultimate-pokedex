import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

type ComponentProps = {
  isOpen: boolean
  onClose: () => void
  headerText: string
}

const ModalSchema: React.FC<ComponentProps> = ({ isOpen, onClose, children, headerText }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />

      <ModalContent fontSize={['sm', 'md', 'lg']} marginLeft="5%" marginRight="5%">
        <ModalHeader textAlign="center">{headerText}</ModalHeader>

        <ModalCloseButton />

        <ModalBody display="flex" flexDir="column">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalSchema
