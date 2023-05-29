/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '../storageConfig'
import { playersGetByGroups } from './playersGetByGroups'

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroups(group)

    const filtered = storage.filter((player) => player.name !== playerName)
    // percorre os players e verifica se os nomes são diferentes do nome que eu quero remover
    // ou seja vai armazenar todos os pleyers menos o que eu quero remover
    const players = JSON.stringify(filtered)
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
    // passa a chave e o valor do player que será excluido
  } catch (error) {
    throw error
  }
}
