import { useCallback, useEffect, useState } from 'react';
import { useData } from '../../providers';

import { CustomSelect } from './CustomSelect';

import styled from 'styled-components';

const constructToURL = (url, query, stateValue) => {
  const searchParams = url.searchParams;
  const URLCurrent = new URL(window.location.href);

  if (stateValue) {
    searchParams.set(query, stateValue.toLowerCase());
    URLCurrent.searchParams.set(query, stateValue.toLowerCase());
  } else {
    searchParams.delete(query);
    URLCurrent.searchParams.delete(query);
  }

  window.history.pushState({}, '', `?${URLCurrent.searchParams}`);
};

export function Filter() {
  const { fetchData, setApiURL, apiURL, uniqueData, paramsState } = useData();

  const [statusValue, setStatusValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('');

  const [speciesOptionsState, setSpeciesOptionsState] = useState([]);
  const [gendersOptionsState, setGendersOptionsState] = useState([]);
  const [statusesOptionsState, setStatusesOptionsState] = useState([]);

  const applyFilters = useCallback(async () => {
    const URLWithPage = new URL(apiURL);

    constructToURL(URLWithPage, 'status', statusValue);
    constructToURL(URLWithPage, 'gender', genderValue);
    constructToURL(URLWithPage, 'species', speciesValue);
    constructToURL(URLWithPage, 'name', nameValue);
    constructToURL(URLWithPage, 'type', typeValue);

    setApiURL(URLWithPage);

    return await fetchData(URLWithPage);
  }, [
    apiURL,
    fetchData,
    genderValue,
    nameValue,
    setApiURL,
    speciesValue,
    statusValue,
    typeValue
  ]);

  const setNameValueOnChange = useCallback((e) => {
    setNameValue(e.target.value);
  }, []);

  const setTypeValueOnChange = useCallback((e) => {
    setTypeValue(e.target.value);
  }, []);

  useEffect(() => {
    setSpeciesOptionsState(uniqueData.uniqueSpecies);
    setGendersOptionsState(uniqueData.uniqueGender);
    setStatusesOptionsState(uniqueData.uniqueStatus);

    setStatusValue(paramsState['status'] || '');
    setGenderValue(paramsState['gender'] || '');
    setSpeciesValue(paramsState['species'] || '');
    setNameValue(paramsState['name'] || '');
    setTypeValue(paramsState['type'] || '');
  }, [paramsState, uniqueData]);

  return (
    <StyledFilter>
      <CustomSelect
        options={statusesOptionsState}
        placeholder="Status"
        selectedValue={statusValue}
        setSelectedValue={setStatusValue}
      />
      <CustomSelect
        options={gendersOptionsState}
        placeholder="Gender"
        selectedValue={genderValue}
        setSelectedValue={setGenderValue}
      />
      <CustomSelect
        options={speciesOptionsState}
        placeholder="Species"
        selectedValue={speciesValue}
        setSelectedValue={setSpeciesValue}
      />
      <Input
        name="name"
        placeholder="Name"
        onChange={setNameValueOnChange}
        value={nameValue}
      />
      <Input
        name="type"
        placeholder="Type"
        onChange={setTypeValueOnChange}
        value={typeValue}
      />
      <ButtonsWrapper>
        <EventButtonGreen onClick={applyFilters}>Apply</EventButtonGreen>
        <EventButtonRed>Reset</EventButtonRed>
      </ButtonsWrapper>
    </StyledFilter>
  );
}

const StyledFilter = styled.div`
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

const Input = styled.input`
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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const EventButton = styled.button`
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

const EventButtonGreen = styled(EventButton)`
  color: #83bf46;
  border: 1px solid #83bf46;

  &:hover {
    background-color: #83bf46;
  }
`;

const EventButtonRed = styled(EventButton)`
  color: #ff5152;
  border: 1px solid #ff5152;

  &:hover {
    background-color: #ff5152;
  }
`;
