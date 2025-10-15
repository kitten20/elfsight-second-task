import { useCallback, useEffect, useState } from 'react';
import { useData } from '../../providers';

import { CustomSelect } from './custom-select';

import * as S from './index.styles';

// Из-за того, что неоткуда дёргать из одного места оптимизированно опшионы, решил их захардкодить
const statusOptions = ['Alive', 'Dead', 'unknown'];
const genderOptions = ['Male', 'Female', 'unknown'];
const speciesOptions = ['Human', 'Alien'];

const constructToURL = (url, query, stateValue) => {
  const searchParams = url.searchParams;
  if (stateValue) {
    searchParams.set(query, stateValue.toLowerCase());
  } else {
    searchParams.delete(query);
  }
};

export function Filter() {
  const { fetchData, resetFetchData, setApiURL, apiURL } = useData();

  const [statusValue, setStatusValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('');

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

  const resetFilters = useCallback(async () => {
    setStatusValue('');
    setGenderValue('');
    setSpeciesValue('');
    setNameValue('');
    setTypeValue('');

    return await resetFetchData();
  }, [resetFetchData]);

  useEffect(() => {
    const apiPageSearchParam = new URL(apiURL).searchParams;

    setStatusValue(apiPageSearchParam.get('status'));
    setGenderValue(apiPageSearchParam.get('gender'));
    setSpeciesValue(apiPageSearchParam.get('species'));
    setNameValue(apiPageSearchParam.get('name'));
    setTypeValue(apiPageSearchParam.get('type'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Filter>
      <CustomSelect
        options={statusOptions}
        placeholder="Status"
        selectedValue={statusValue}
        setSelectedValue={setStatusValue}
      />
      <CustomSelect
        options={genderOptions}
        placeholder="Gender"
        selectedValue={genderValue}
        setSelectedValue={setGenderValue}
      />
      <CustomSelect
        options={speciesOptions}
        placeholder="Species"
        selectedValue={speciesValue}
        setSelectedValue={setSpeciesValue}
      />
      <S.Input
        name="name"
        placeholder="Name"
        onChange={(e) => setNameValue(e.target.value)}
      />
      <S.Input
        name="type"
        placeholder="Type"
        onChange={(e) => setTypeValue(e.target.value)}
      />
      <S.ButtonsWrapper>
        <S.EventButtonGreen onClick={applyFilters}>Apply</S.EventButtonGreen>
        <S.EventButtonRed onClick={resetFilters}>Reset</S.EventButtonRed>
      </S.ButtonsWrapper>
    </S.Filter>
  );
}
