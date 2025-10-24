import { useState, useRef, useEffect, useCallback } from 'react';

import styled from 'styled-components';

import chevronIcon from '../../../assets/icons/chevron-down.svg';
import crossIcon from '../../../assets/icons/cross-icon.svg';
import crossGreenIcon from '../../../assets/icons/cross-icon-green.svg';

export function CustomSelect({
  placeholder,
  options,
  selectedValue,
  setSelectedValue
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (value) => () => {
      setSelectedValue(value);
      setIsOpen(false);
    },
    [setSelectedValue]
  );

  const toggleSelect = useCallback(() => setIsOpen((p) => !p), []);
  const clearSelect = useCallback(() => {
    if (selectedValue) {
      setSelectedValue('');
      setIsOpen(false);
    }
  }, [selectedValue, setSelectedValue]);

  return (
    <CustomSelectContainer ref={selectRef}>
      <SelectHeader onClick={toggleSelect} opened={isOpen}>
        <span className={!selectedValue ? 'placeholder' : ''}>
          {selectedValue || placeholder}
        </span>
        <ChevronButton onClick={clearSelect}>
          {!selectedValue ? (
            <ChevronIcon src={chevronIcon} alt="chevron" opened={isOpen} />
          ) : (
            <>
              <img src={crossIcon} alt="crossIcon" className="cross_usual" />
              <img
                src={crossGreenIcon}
                alt="crossGreenIcon"
                className="cross_green"
              />
            </>
          )}
        </ChevronButton>
      </SelectHeader>

      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={handleSelect(option)}
              active={option === selectedValue}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </CustomSelectContainer>
  );
}

const CustomSelectContainer = styled.div`
  position: relative;

  width: 100%;
`;

const SelectHeader = styled.div`
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

const ChevronButton = styled.button`
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

const ChevronIcon = styled.img`
  opacity: ${(props) => (props.opened ? 1 : 0.75)};
  transform: ${(props) => (props.opened ? 'rotate(180deg)' : 'none')};
`;

const DropdownList = styled.ul`
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

const DropdownItem = styled.li`
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
