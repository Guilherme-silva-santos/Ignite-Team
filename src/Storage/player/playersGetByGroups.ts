import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playersGetByGroups(group: string) {
  // passa para função qual o grupo que foi selecionado
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
    // Busca a coleção de jogadores que estão presentes em determinado grupo

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []
    // o tipo dos players sera do tipo PlayerStorageDTO, se o storage tiver conteudo fas um trnaforma ele em um objeto
    // se não retorna um array vazio
    return players
    // da um return nos players pois caso a verificação acontecer orecisa retornar o que há dentro dela
  } catch (error) {
    throw error
  }
}
