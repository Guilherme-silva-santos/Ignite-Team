import { TouchableOpacityProps } from 'react-native'
import { ButtonIconTypeStyleProps, Container, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  // flando que o icon é do tipo material icons e glyphMap entrega todos os icons disponiveis na lib
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ icon, type = 'primary', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
