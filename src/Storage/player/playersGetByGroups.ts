import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playersGetByGroups(group: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
    // seleciona todos os jogadores que estão no grupo solicitado

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []
    return players
  } catch (error) {
    throw error
  }
}
