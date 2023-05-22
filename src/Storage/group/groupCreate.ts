import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../storageConfig'
import { groupsGetAll } from './groupsGetAll'

export async function groupCreate(newGroup: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    // tenta criar o group dentro do estorage
    const storadGroups = await groupsGetAll()
    // pega a função de dentro do groupsGetAll
    const storage = JSON.stringify([...storadGroups, newGroup])
    // converte tudo que esta no storadGroups e no newGroup para string para que possam ser armazenados dentro
    // do asyncstorage
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    // asyncstorage é baseado em chave e produto
    // então no setitem passou a chave e o produto que é o novo grupo
  } catch (error) {
    // se o group não for criado dará um erro
    throw error
  }
}
