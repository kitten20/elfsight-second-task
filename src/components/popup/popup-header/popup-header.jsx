import { PopupImage, PopupStatus, PopupTitle } from './index.styles';

export function PopupHeader({ image, name, gender, status, species, type }) {
  return (
    <div>
      <PopupImage src={image?.replace('../', '')} alt={name} />
      <PopupTitle {...{ name, gender }} />
      <PopupStatus {...{ status, species, type }} />
    </div>
  );
}
