import { useState } from 'react';
import { useData } from '../providers';

import { Popup } from '../popup';
import { Card } from '../card';

import * as S from './index.styles';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const cardOnClickHandler = (character) => {
    setPopupSettings({ visible: true, content: { ...character } });
  };

  if (!characters.length) {
    return <></>;
  }

  return (
    <S.Container>
      {characters.map((character) => (
        <Card
          key={character.id}
          onClickHandler={() => cardOnClickHandler(character)}
          {...character}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </S.Container>
  );
}
