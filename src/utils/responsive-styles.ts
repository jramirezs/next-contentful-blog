interface Breakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export default function(styles?: string, responsive?: Breakpoints): string {
  let responsiveStyles = '';
  if (responsive) {
    responsiveStyles = Object.entries(responsive)
      .map(([key, value]) => {
        return value.replace(/(\s|^)/g, `$1${key}:`);
      })
      .join(' ');
  }

  return `${styles} ${responsiveStyles}`.trim();
}
