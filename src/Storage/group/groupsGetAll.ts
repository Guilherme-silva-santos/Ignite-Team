import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../storageConfig'

export async function groupsGetAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    // acessa o storage do ususario e pega as informações contidas dentro da chave GROUP_COLLECTION
    const groups: string[] = storage ? JSON.parse(storage) : []
    // criando um groups sendo ele um array, verifa se o storage possui algum conteudo
    // e se possuir pega ele e transforma para um objeto, pois quando ele está dentro do storage ele é uma string
    // e para que ele possa ser percorrido precisa ser um objeto, e caso não houver nada dentro do storage
    // retorna um array vázio

    return groups
  } catch (error) {
    throw error
  }
}
