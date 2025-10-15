import { useCallback, useEffect, useRef } from 'react';

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

  const popupContainerRef = useRef(null);

  const hidePopup = useCallback(() => {
    setSettings((prevState) => ({
      ...prevState,
      visible: false
    }));
  }, [setSettings]);

  function togglePopup(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        hidePopup();
      }
    });
  }, [hidePopup, visible]);

  const removePopupContainer = useCallback(
    (e) => {
      if (popupContainerRef && e.target === popupContainerRef.current) {
        hidePopup();
      }
    },
    [hidePopup]
  );

  return (
    <PopupContainer
      {...{ visible }}
      onClick={removePopupContainer}
      ref={popupContainerRef}
    >
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader {...{ name, gender, image, status, species, type }} />

        <PopupInfo {...{ origin, location }} />

        <PopupEpisodes {...{ episodes }} />
      </StyledPopup>
    </PopupContainer>
  );
}
