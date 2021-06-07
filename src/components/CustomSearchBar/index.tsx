import { Search2Icon } from '@chakra-ui/icons'
import { forwardRef, Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'

const CustomSearchBar = forwardRef<InputProps, 'input'>((props, ref) => (
  <InputGroup width="50%">
    <InputLeftAddon>
      <Search2Icon color="gray.300" />
    </InputLeftAddon>
    <Input {...props} ref={ref} />
  </InputGroup>

))

export default CustomSearchBar
