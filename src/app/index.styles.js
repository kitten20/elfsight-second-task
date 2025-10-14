import styled from 'styled-components';

export const Main = styled.main`
  height: 100%;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
