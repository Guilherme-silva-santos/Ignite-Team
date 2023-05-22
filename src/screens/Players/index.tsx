import { FlatList, Alert } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'

import { Highlight } from '@components/Highlight'
import { Header } from '@components/Header'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Container, Form, HeaderList, NumberOfPlayer } from './styles'
import { AppError } from '@utils/AppError'
import { playerAddByGroups } from '../../Storage/player/playerAddByGroup'
import { playersGetByGroups } from '../../Storage/player/playersGetByGroups'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Informe o nome do novo jogador')
    }

    const newPlayer = {
      // o novo player precisa ter um nome e um team conforme foi passado para a tipagem DTO
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroups(newPlayer, group)
      const players = await playersGetByGroups(group)
      console.log(players)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nove Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nove Pessoa', 'Não foi possível adicionar')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe o times " />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
              // quando for clicado atualiza o estado com o valor do item que foi clicado
            />
          )}
          horizontal
        />
        <NumberOfPlayer>{players.length}</NumberOfPlayer>
        {/* será a quantidade de jogadores que estiverem dentro de players  */}
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 20 },
          players.length === 0 && { flex: 1 },
          // se o array de users for igual a zero deixa o item de listempty com flex de 1
        ]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
      />

      <Button title="Remover Turma" type="secondary" />
    </Container>
  )
}
