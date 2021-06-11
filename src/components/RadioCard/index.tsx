import { Box, Flex, Input, Tooltip, useRadio, UseRadioProps } from '@chakra-ui/react'

interface ComponentProps {
  radioProps: UseRadioProps
  value: string
  bgColor: string,
  tooltipText: string
}

const RadioCard: React.FC<ComponentProps> = ({ radioProps, children, bgColor, value, tooltipText }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Tooltip hasArrow label={tooltipText}>
      <Box as="label" width="100%" height="100%">
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
    </Tooltip>
  )
}

export default RadioCard
