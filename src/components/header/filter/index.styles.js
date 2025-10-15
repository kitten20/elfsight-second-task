import styled from 'styled-components';

export const Filter = styled.div`
  display: grid;
  grid-template-columns: 180px 180px 180px;
  gap: 10px;

  & * {
    &::first-letter {
      text-transform: uppercase;
    }
  }

  @media (max-width: 1280px) {
    grid-template-columns: 150px 150px 150px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 240px;
  }
`;

export const CustomSelectContainer = styled.div`
  position: relative;

  width: 100%;
`;

export const SelectHeader = styled.div`
  padding: 11px;

  border-radius: 8px;
  background-color: ${(props) => (props.opened ? '#334466' : '#263750')};
  border: 1px solid #83bf46;
  font-size: 16px;
  outline: none;
  color: white;
  line-height: 1;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .placeholder {
    color: #b3b3b3;
  }

  &:hover {
    background-color: #334466;
  }
`;

export const ChevronButton = styled.button`
  position: absolute;
  right: 11px;
  top: 11px;

  background-color: transparent;
  border: none;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 16px;
  }

  .cross {
    &_usual,
    &_green {
      position: absolute;
      top: 0;
      right: 0;
    }

    &_usual {
      visibility: visible;
    }

    &_green {
      visibility: hidden;
    }
  }

  &:hover {
    .cross {
      &_usual {
        visibility: hidden;
      }

      &_green {
        visibility: visible;
      }
    }
  }
`;

export const ChevronIcon = styled.img`
  opacity: ${(props) => (props.opened ? 1 : 0.75)};
  transform: ${(props) => (props.opened ? 'rotate(180deg)' : 'none')};
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;

  background-color: #263750;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  list-style: none;

  margin: 5px 0 0;
  padding: 0;
  max-height: calc(35px * 5);

  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const DropdownItem = styled.li`
  padding: 8px 12px;

  cursor: pointer;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background-color: white;

  &:hover {
    background-color: #e6f2da;
  }

  &:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;

export const Option = styled.option`
  background-color: red;
  color: black;
`;

export const Input = styled.input`
  padding: 11px;

  border-radius: 8px;
  background-color: #263750;
  border: 1px solid #83bf46;
  font-size: 16px;
  outline: none;
  color: white;
  line-height: 1;

  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:hover {
    background-color: #334466;
  }

  &:focus {
    background-color: #334466;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const EventButton = styled.button`
  padding: 11px;
  width: 50%;

  background-color: transparent;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  border: none;

  cursor: pointer;

  &:hover {
    color: white;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const EventButtonGreen = styled(EventButton)`
  color: #83bf46;
  border: 1px solid #83bf46;

  &:hover {
    background-color: #83bf46;
  }
`;

export const EventButtonRed = styled(EventButton)`
  color: #ff5152;
  border: 1px solid #ff5152;

  &:hover {
    background-color: #ff5152;
  }
`;
