import { useCallback, useEffect, useState } from 'react';
import { useData } from '../providers';

import * as S from './index.styles';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);
    },
    [pages, setActivePage, setApiURL]
  );

  const moveToFirstPage = () => {
    return pageClickHandler(0);
  };

  const moveOnePageBack = () => {
    return pageClickHandler(activePage - 1);
  };

  const moveOnePageForward = () => {
    return pageClickHandler(activePage + 1);
  };

  const moveToLastPage = () => {
    return pageClickHandler(pages.length - 1);
  };

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [apiURL, info.pages]);

  if (!pages.length) {
    return <></>;
  }

  return (
    <S.StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <S.Page onClick={moveToFirstPage}>« First</S.Page>
              <S.Ellipsis>...</S.Ellipsis>
            </>
          )}

          <S.Page onClick={moveOnePageBack}>{activePage}</S.Page>
        </>
      )}

      <S.Page active>{activePage + 1}</S.Page>

      {pages[activePage + 1] && (
        <>
          <S.Page onClick={moveOnePageForward}>{activePage + 2}</S.Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <S.Ellipsis>...</S.Ellipsis>
              <S.Page onClick={moveToLastPage}>Last »</S.Page>
            </>
          )}
        </>
      )}
    </S.StyledPagination>
  );
}
