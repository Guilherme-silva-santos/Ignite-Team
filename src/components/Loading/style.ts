import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

/**
 * attrs serve para acesar os atributos do componente, como nesse caso o activityIndicator recebe color
 * como uma props podemos acessa-la atraves do attrs e com ele acessa o tema da aplicação
 * e ultiliza ele para estilizar a cor dele
 */
export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.RED,
}))``
