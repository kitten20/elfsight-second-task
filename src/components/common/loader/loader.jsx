import styled, { keyframes } from 'styled-components';

import portal from '../../../assets/green-portal.png';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  margin: auto;
  width: 200px;
  height: 200px;

  background: url(${portal}) center no-repeat;
  background-size: cover;

  animation: ${spin} 2s linear infinite;
`;
