import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Groups } from '@screens/Groups'
import { NewGroup } from '@screens/NewGroup'
import { Players } from '@screens/Players'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/**
       * => Navigator é para indicar que esta sendo feita uma navegação
       * => screenOptions={{ headerShown: false }} Serve para que não seja exibido o cabeçalho como o nome da rota
       *
       * => Screens são os componentes que serão renderizados assim que as rotas forem chamadas
       * como por exemplo a screen groups, quando ela for chamada o componente de groups será renderizado
       */}
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  )
}
