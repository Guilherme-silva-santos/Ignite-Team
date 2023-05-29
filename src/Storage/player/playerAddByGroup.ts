import AsyncStorage from '@react-native-async-storage/async-storage'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../storageConfig'
import { playersGetByGroups } from './playersGetByGroups'
import { AppError } from '@utils/AppError'

export async function playerAddByGroups(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  // o newPlayer precisa receber a tipagem PlayerStorageDTO
  // de que grupo esse player faz parte
  // eslint-disable-next-line no-useless-catch
  try {
    const storagePlayers = await playersGetByGroups(group)
    // pega todos os playres que ja estao armazenados e passa qual o grupo em que eles estão
    const playerAlreadyExist = storagePlayers.filter(
      (player) => player.name === newPlayer.name,
      // percorre o player, pega o nome e verifica se o player que esta sendo cadastrado é igual ao nome do player
      // já existente
    )
    if (playerAlreadyExist.length > 0) {
      // caso o playerAlreadyExist for maior que 0
      // ou seja caso tenha alguem com o nome ja cadastrado
      throw new AppError('Essa pessoa já está adicionada em um time.')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])
    // transforma para string todos os playrs ja armazenados e adiciona o novo player

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    /**
     * Dentro das chaves PLAYER_COLLECTION
     * const PLAYER_COLLECTION = '@ignite-teams:players' aqui estão sendo armazenados os players
     * mas agora serão add os players e os grupos serão dinamicos @ignite-teams:players-Ignite[] por exemplo
     * então a o grupo do AsyncStorage fica de forma dinamica pois vai depender de qual grupo foi selecionado
     * Com isso sera criado um array com os participantes de cada grupo:
     * @ignite-teams:players-Ignite[]
     * @ignite-teams:players-Amigos[]
     * @ignite-teams:players-Rocket[]
     *
     * apos passar a chave do produto, passa o produto em si que são os players que ja esta presentes na liste e os
     * que vão ser adicionados
     */
  } catch (error) {
    throw error
  }
}
