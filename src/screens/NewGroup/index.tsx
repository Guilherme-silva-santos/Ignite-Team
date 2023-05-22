import { useState } from 'react'
import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '../../Storage/group/groupCreate'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      await groupCreate(group)
      // armazena os groups dentro do storage
      navigation.navigate('players', { group })
      // passando a informação para dentro da rota players
      // informação que esta contida no estado pois o onChengeText foi passado para o input
      // e toda vez que ele mudar será armazenado seu valor dentro do estado groups atraves da função setGroup
    } catch (error) {
      console.log(error)
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
