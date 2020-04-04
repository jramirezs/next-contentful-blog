declare module 'emojilib' {
  export interface Emoji {
    keywords: string[];
    char: string;
    fitzpatrick_scale: boolean;
    category: string;
  }

  export const lib: Record<string, Emoji>;
}
