import { useState, useRef, useEffect } from 'react';

import * as S from './index.styles';

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

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggleSelect = () => setIsOpen((p) => !p);
  const clearSelect = () => {
    if (selectedValue) {
      setSelectedValue('');
      setIsOpen(false);
    }
  };

  return (
    <S.CustomSelectContainer ref={selectRef}>
      <S.SelectHeader onClick={toggleSelect} opened={isOpen}>
        <span className={!selectedValue ? 'placeholder' : ''}>
          {selectedValue || placeholder}
        </span>
        <S.ChevronButton onClick={clearSelect}>
          {!selectedValue ? (
            <S.ChevronIcon src={chevronIcon} alt="chevron" opened={isOpen} />
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
        </S.ChevronButton>
      </S.SelectHeader>

      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownItem
              key={option}
              onClick={() => handleSelect(option)}
              active={option === selectedValue}
            >
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.CustomSelectContainer>
  );
}
