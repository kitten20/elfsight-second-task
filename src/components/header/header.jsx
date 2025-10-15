import { Logo } from './logo';
import { Filter } from './filter/filter';

import { HeaderContainer } from './index.styles';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filter />
    </HeaderContainer>
  );
}
