import {
  CardStatusContainer,
  CardType,
  StyledCardStatus
} from './index.styles';

export function CardStatus({ status, species, type, className }) {
  return (
    <CardStatusContainer className={className}>
      <StyledCardStatus {...{ status }}>{status}</StyledCardStatus>
      &nbsp;-&nbsp;
      <span>{species}</span>
      {type && <CardType>{type}</CardType>}
    </CardStatusContainer>
  );
}
