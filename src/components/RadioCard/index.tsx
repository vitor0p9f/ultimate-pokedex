import { Flex, Input, Tooltip, useRadio, UseRadioProps } from '@chakra-ui/react'

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
      <Flex
        as="label"
        {...checkbox}
        width="4.5em"
        height="4.5em"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        cursor="pointer"
        bgColor={bgColor}
        _focus={{
          borderWidth: '5px',
          borderColor: 'yellow'
        }}
        margin="0"
      >
        <Input {...input} value={value} />
        {children}
      </Flex>
    </Tooltip>
  )
}

export default RadioCard
