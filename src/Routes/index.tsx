import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'

export function Routes() {
  const { COLORS } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        {/**
         * => NavigationContainer é o container de navegação da aplicação é onde estão armazenadas todas as rotas da
         * aplicação.
         * Serve para que todas as rotas sejam compartilhadas para toda a aplicação
         * E dentro dele foi colocado o arqueivo onde estão todoas as rotas da aplicação
         */}
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
