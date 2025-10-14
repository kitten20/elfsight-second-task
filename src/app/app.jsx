import { Pagination, ItemsGrid, Header, AppState } from '../components';

import './index.css';
import * as S from './index.styles';

export function App() {
  return (
    <S.Main>
      <Header />

      <AppState>
        <ItemsGrid />

        <Pagination />
      </AppState>
    </S.Main>
  );
}
