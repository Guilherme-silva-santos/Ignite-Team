import { Container, Icon, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  /**
   * cria um type para tipar o title e add nesse type as props do TouchableOpacityProps
   * para que dentro do componente posssa ser passada props de um botão
   */
  title: string
}

export function GroupCard({ title, ...rest }: Props) {
  // rest para que qualquer outra tipagem passada para o componente seja transferida para o TouchableOpacity
  // que é o container da função
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
