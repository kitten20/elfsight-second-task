import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

async function getAllSpeciesOptimized() {
  const speciesSet = new Set();
  const genderSet = new Set();
  const statusSet = new Set();
  let nextUrl = API_URL;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    data.results.forEach((char) => {
      speciesSet.add(char.species.toLowerCase());
      statusSet.add(char.status.toLowerCase());
      genderSet.add(char.gender.toLowerCase());
    });
    nextUrl = data.info.next;
  }

  return {
    uniqueSpecies: Array.from(speciesSet),
    uniqueGender: Array.from(genderSet),
    uniqueStatus: Array.from(statusSet)
  };
}

const allFilters = ['status', 'gender', 'species', 'name', 'type'];

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [uniqueData, setUniqueData] = useState({});
  const [paramsState, setParamsState] = useState({});

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
    getAllSpeciesOptimized()
      .then((res) => {
        setUniqueData(res);

        return res;
      })
      .then((res) => {
        const params = new URLSearchParams(window.location.search);
        const URLWithPage = new URL(API_URL);

        for (const [key, value] of params) {
          if (allFilters.includes(key)) {
            if (key === 'status' || key === 'species' || key === 'gender') {
              const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

              if (res[`unique${capitalizedKey}`]?.includes(value)) {
                URLWithPage.searchParams.set(key, value);
                setParamsState((p) => ({ ...p, [key]: value }));
              }
            } else {
              URLWithPage.searchParams.set(key, value);
              setParamsState((p) => ({ ...p, [key]: value }));
            }
          }
        }

        setApiURL(URLWithPage);
      });
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      uniqueData,
      paramsState
    }),
    [
      activePage,
      apiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      uniqueData,
      paramsState
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
