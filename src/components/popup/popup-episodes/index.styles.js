import styled, { css } from 'styled-components';

export const PopupEpisodesContainer = styled.div``;

export const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ _length }) =>
    _length > 20 &&
    css`
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(
        ${window.screen.width < 600 ? _length : Math.ceil(_length / 2)},
        1fr
      );

      & p {
        width: 95%;
        border-bottom: 2px solid #eee;
      }

      & span {
        margin-bottom: ${window.screen.width < 600 ? '10px' : 0};
      }
    `};

  ${window.screen.width < 600 && 'grid-template-columns: 1fr'};
`;

export const Episode = styled.p`
  width: 100%;
  display: grid;
  align-items: center;
  padding: 10px 0;
`;

export const EpisodeMarking = styled.span`
  margin-bottom: 8px;
  color: #83bf46;
`;
