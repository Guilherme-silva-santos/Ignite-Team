import AsyncStorage from '@react-native-async-storage/async-storage'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../storageConfig'
import { playersGetByGroups } from './playersGetByGroups'
import { AppError } from '@utils/AppError'

export async function playerAddByGroups(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  // eslint-disable-next-line no-useless-catch
  try {
    /**
     * Dentro das chaves PLAYER_COLLECTION
     * const PLAYER_COLLECTION = '@ignite-teams:players' aqui estão sendo armazenados os players
     * mas agora serão add os players e os grupos serão dinamicos @ignite-teams:players-Ignite[] por exemplo
     * então a chave que foi passada para o AsyncStorage fica de forma dinamica, e em seguida foi passado
     * o produto
     */

    const storagePlayers = await playersGetByGroups(group)
    const playerAlreadyExist = storagePlayers.filter(
      (player) => player.name === newPlayer.name,
      // percorre o player, pega o nome e verifica se o player que esta sendo cadastrado é igual ao nome do player
      // já existente
    )
    if (playerAlreadyExist.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
