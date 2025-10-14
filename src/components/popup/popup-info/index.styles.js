import styled from 'styled-components';

export const StyledPopupInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PopupOrigin = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  max-width: 48%;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

export const PopupOriginValue = styled.p`
  color: #83bf46;
`;
