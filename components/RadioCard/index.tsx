import { Box, Flex, Input, useRadio, UseRadioProps } from '@chakra-ui/react'

interface ComponentProps {
  radioProps: UseRadioProps
  value: string
  bgColor: string
}

const RadioCard: React.FC<ComponentProps> = ({ radioProps, children, bgColor, value }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" width="4em"
      height="4em">
      <Input {...input} value={value} />
      <Flex
        {...checkbox}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        cursor="pointer"
        bgColor={bgColor}
        _focus={{
          borderWidth: '0.3em',
          borderColor: 'yellow'
        }}
        margin="0"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default RadioCard
