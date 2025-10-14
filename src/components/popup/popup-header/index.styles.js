import { CardStatus, CardTitle } from '../../card';

import styled from 'styled-components';

export const PopupTitle = styled(CardTitle)`
  font-size: 22px;
  margin-top: 30px;
  justify-content: center;
`;

export const PopupStatus = styled(CardStatus)`
  font-size: 20px;
  justify-content: center;

  & p {
    text-align: center;
    margin-top: 10px;
  }
`;

export const PopupImage = styled.img`
  display: block;
  border-radius: 5px;
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
`;
