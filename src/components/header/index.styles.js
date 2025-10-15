import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1280px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const StyledLogo = styled.img`
  max-width: 300px;
  user-select: none;

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
