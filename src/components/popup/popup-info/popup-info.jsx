import { Text } from '../../common';

import { PopupOrigin, PopupOriginValue, StyledPopupInfo } from './index.styles';

export function PopupInfo({ origin, location }) {
  return (
    <StyledPopupInfo>
      {origin?.name !== 'unknown' && (
        <PopupOrigin>
          <Text>First Seen in:</Text>
          <PopupOriginValue>{origin?.name}</PopupOriginValue>
        </PopupOrigin>
      )}

      {location?.name !== 'unknown' && (
        <PopupOrigin>
          <Text>Last known location:</Text>
          <PopupOriginValue>{location?.name}</PopupOriginValue>
        </PopupOrigin>
      )}
    </StyledPopupInfo>
  );
}
