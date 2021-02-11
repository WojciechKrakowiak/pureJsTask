import { BrowserSpriteSymbol } from 'icons/BrowserSpriteSymbol';

const getIcon = (icon: BrowserSpriteSymbol, classNames?: string): string => {
  return `
    <svg viewBox="${icon.viewBox}" class="${classNames}">
        <use xlink:href="#${icon.id}" />
    </svg>
    `;
};

export default getIcon;
