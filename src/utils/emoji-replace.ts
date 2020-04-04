import { lib } from 'emojilib';

export default function(text: string): string {
  const regex = /:[^:\s]*(?:::[^:\s]*)*:/gm;
  let newText = text.slice();

  const matches = new Set(text.match(regex));

  matches.forEach(m => {
    const match = m.replace(/:/g, '');
    const emoji = lib[match];
    if (emoji) {
      newText = newText.replace(new RegExp(m, 'gm'), emoji.char);
    }
  });

  return newText;
}
