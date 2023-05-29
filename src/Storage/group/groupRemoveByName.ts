/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig'
import { groupsGetAll } from './groupsGetAll'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storageGroups = await groupsGetAll()
    const groups = storageGroups.filter((group) => group !== groupDeleted)
    // retorna todos os grupos menos o que foi deletado

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    /**
      * seta um novo item na chave e nessa chave pega os grupos que tem todos os grupos menos o deletado
        ou seja, esta sobreescrevendo o produto por um novo sem o grupo deletado, e dessa maneira mantendo os grupos
        cadastrados.
        Aqui só deixa de listar os grupos que foram deletados e abaixo remove os players que fazer parte dos 
        grupos deletados 
      */
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
    // ja nesse caso ele remove a chave inteira dos grupos deletados
  } catch (error) {
    throw error
  }
}
