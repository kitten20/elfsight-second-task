import { useData } from '../providers';

import { Loader, Text } from '../common';

import * as S from './index.styles';

export function AppState({ children }) {
  const { isFetching, isError } = useData();

  if (isError) {
    return (
      <S.AppStateContainer>
        <Text>An error has occurred. Try other search parameters.</Text>
      </S.AppStateContainer>
    );
  }

  if (isFetching) {
    return (
      <S.AppStateContainer>
        <Loader />
      </S.AppStateContainer>
    );
  }

  return children;
}
