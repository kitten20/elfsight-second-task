import { CardStatus } from './card-status/card-status';
import { CardTitle } from './card-title/card-title';
import { CardImg, CardInfo, StyledCard } from './index.styles';

// TODO: Refactor the Card component - сделано
export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <StyledCard onClick={onClickHandler}>
      <CardImg src={image} alt={name} />

      <CardInfo>
        <CardTitle {...{ name, gender }} />

        <CardStatus {...{ status, species, type }} />
      </CardInfo>
    </StyledCard>
  );
}
