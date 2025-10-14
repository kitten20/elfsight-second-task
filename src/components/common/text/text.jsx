import * as S from './index.styles';

export function Text({
  className,
  children,
  style,
  color = '#ccc',
  fontSize = '16px'
}) {
  return (
    <S.StyledText
      className={className}
      style={style}
      _color={color}
      _fontSize={fontSize}
    >
      {children}
    </S.StyledText>
  );
}
