import { Header } from '@components/Header'
import { Container } from './styles'
import { GroupCard } from '@components/GroupCard'
import { Highlight } from '@components/Highlight'
import { useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { groupsGetAll } from '../../Storage/group/groupsGetAll'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      // pega todos os grupos
      setGroups(data)
      // armazena eles no estado
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroups(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
      // vai executar a função fetchGroups quando o componente for renderizado pela primeira vez
      // ou seja quando o componente já estiver sido renderizado uma vez o useEffect não executara de novo
      // um prova disso é usar um log da seguinte maneira dentro do hook console.log('UseEffct foi executado ')

      // então caso um grupo seja armazenado depois do hook ser executado ele não vai aparecer em tela
      // pois o hook só executa uma unica vez, para que o novo grupo seja renderizado em tela
      // é preciso passar o groups como dependencia, pois é onde os grupos estão armazenados
    }, []),
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroups(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
