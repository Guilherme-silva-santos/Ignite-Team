import { useState } from 'react'
import { Alert } from 'react-native'
import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '../../Storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        // trim remove espaços do length,os espaços não são contabilizados como caracteres
        return Alert.alert('Novo Grupo', 'Informe o nome da turma')
      }

      await groupCreate(group)
      // armazena os groups dentro do storage
      navigation.navigate('players', { group })
      /**
       * passando a informação para dentro da rota players
        informação que esta contida no estado pois o onChengeText foi passado para o input
        e toda vez que ele mudar será armazenado seu valor dentro do estado groups atraves da função setGroup
       */
    } catch (error) {
      if (error instanceof AppError) {
        // verefica se o erro é do tipo que foi criado na classe, ou seja, um erro que nos mandamos para o user
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas "
        />
        <Input placeholder=" Nome da Turma" onChangeText={setGroup} />
        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  )
}
