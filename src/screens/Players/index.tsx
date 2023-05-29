import { FlatList, Alert, TextInput } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

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
import { playersGetByGroupAndTeam } from '../../Storage/player/playerGetByGroupAndTeam'
import { playerRemoveByGroup } from '../../Storage/player/playerRemoveByGroup'
import { PlayerStorageDTO } from 'src/Storage/player/PlayerStorageDTO'
import { groupRemoveByName } from '../../Storage/group/groupRemoveByName'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Informe o nome do novo jogador')
      // faz uma verificação se de fato a pessoa digitou o nome do jogador
      // o trim serve para que espaços não sejam contabilizados como caracter
    }

    const newPlayer = {
      // o novo player precisa ter um nome e um team conforme foi passado para a tipagem DTO
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroups(newPlayer, group)
      // chama a função passa o nove jogador e o grupo que foi passado como parametro da rota
      // quando é selecionado o grupo

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      // assim que alguem for add o input será limpado
      // e como foi passado o valor do input como o estado sempre que ele atualiza ele será limpado

      fetchPlayersByTeam()
      // assim que o player for add chama a função e automaticamente regarrega a aplicação atraves do useEffect
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nove Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nove Pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    // eslint-disable-next-line no-useless-catch
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      // pega o grupo e o time que estão armazenados na interface e no estado
      setPlayers(playersByTeam)
      // setplayers é a função do estado que armazena um array de jogadores
      // e passando para ele o playersbyteam que esta armazenando os o player do grupo selecionado de forma filtrada
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
      // quando o grupo for removido volta para página inicial
    } catch (error) {
      console.log(error)
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o grupos', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() },
    ])
  }

  useEffect(() => {
    // o que ele executa
    fetchPlayersByTeam()

    // no array de dependencias o hook será executado sempre que o estado de filter do team mudar
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe o times " />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
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

      <Button
        title="Remover Turma"
        type="secondary"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
