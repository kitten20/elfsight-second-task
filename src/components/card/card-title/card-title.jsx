import { Icon } from '../icon/icon';

import { CardTitleContainer, StyledCardTitle } from './index.styles';

export function CardTitle({ name, gender, className }) {
  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>

      <Icon {...{ gender }} />
    </CardTitleContainer>
  );
}
