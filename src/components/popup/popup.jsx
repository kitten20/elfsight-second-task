import { CloseIcon, PopupContainer, StyledPopup } from './index.styles';
import { PopupEpisodes } from './popup-episodes/popup-episodes';
import { PopupHeader } from './popup-header/popup-header';
import { PopupInfo } from './popup-info/popup-info';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  function togglePopup(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }

  return (
    <PopupContainer {...{ visible }}>
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader {...{ name, gender, image, status, species, type }} />

        <PopupInfo {...{ origin, location }} />

        <PopupEpisodes {...{ episodes }} />
      </StyledPopup>
    </PopupContainer>
  );
}
