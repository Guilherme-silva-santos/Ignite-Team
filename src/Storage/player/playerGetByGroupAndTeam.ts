/* eslint-disable no-useless-catch */
import { playersGetByGroups } from './playersGetByGroups'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  // a função necessita de duas informações grupo e time
  try {
    const storage = await playersGetByGroups(group)
    // pega e armazena todos os grupos e pega as pessoas armazenadas em cada um deles

    const players = storage.filter((player) => player.team === team)
    // retorna os jogadores conforme o time que foi selecionado

    return players
  } catch (err) {
    throw err
  }
}
