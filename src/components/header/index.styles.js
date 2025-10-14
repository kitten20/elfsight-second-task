import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLogo = styled.img`
  max-width: 300px;
  user-select: none;

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
