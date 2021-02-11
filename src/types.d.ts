declare module '*.html' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import { BrowserSpriteSymbol } from 'icons/BrowserSpriteSymbol';
  const value: BrowserSpriteSymbol;
  export default value;
}
