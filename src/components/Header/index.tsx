import { BackIcon, BakcButton, Container, Logo } from './styles'
import logoImg from '@assets/logo.png'
import { useNavigation } from '@react-navigation/native'

type Props = {
  showBackButton?: boolean
} // cria uma tipagem para o componente sendo ela boolean

export function Header({ showBackButton = false }: Props) {
  // o componente recebe o type como props
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {
        // se showBackButton for false não parece o botão
        showBackButton && (
          <BakcButton onPress={handleGoBack}>
            <BackIcon />
          </BakcButton>
        )
      }
      <Logo source={logoImg} />
    </Container>
  )
}
