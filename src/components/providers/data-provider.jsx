import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import axios from 'axios';

export const CHARACTERS_API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(CHARACTERS_API_URL);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  useEffect(() => {
    const apiPageSearchParam = +new URL(apiURL).searchParams.get('page');
    setActivePage(apiPageSearchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFetchData = useCallback(async () => {
    setActivePage(0);
    fetchData(CHARACTERS_API_URL);
    setApiURL(CHARACTERS_API_URL);
  }, [fetchData]);

  const dataValue = {
    activePage,
    setActivePage,
    apiURL,
    setApiURL,
    characters,
    fetchData,
    isFetching,
    isError,
    info,
    resetFetchData
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
