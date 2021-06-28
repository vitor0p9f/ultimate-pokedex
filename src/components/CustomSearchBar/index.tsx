import { Search2Icon } from '@chakra-ui/icons'
import { forwardRef, Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'

const CustomSearchBar = forwardRef<InputProps, 'input'>((props, ref) => (
  <InputGroup width={['90%', '60%']} marginTop="40px" marginBottom="70px">
    <InputLeftAddon bgColor="#E0E0E0">
      <Search2Icon color="#FEFEFE" />
    </InputLeftAddon>
    <Input {...props} ref={ref} bgColor="#FEFEFE" />
  </InputGroup>
))

export default CustomSearchBar
