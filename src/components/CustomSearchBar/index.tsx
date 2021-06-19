import { Search2Icon } from '@chakra-ui/icons'
import { forwardRef, Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'

const CustomSearchBar = forwardRef<InputProps, 'input'>((props, ref) => (
  <InputGroup width={['90%', '60%']}>
    <InputLeftAddon bgColor="#EEEEEE">
      <Search2Icon color="#FEFEFE" />
    </InputLeftAddon>
    <Input {...props} ref={ref} bgColor="#FEFEFE" />
  </InputGroup>
))

export default CustomSearchBar
