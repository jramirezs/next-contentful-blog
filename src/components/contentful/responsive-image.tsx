import React from 'react';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'>;

const widths = [320, 640, 1080, 1280, 1920];

const ResponsiveImage: React.FC<Props> = ({ src, ...rest }) => {
  const srcSet = widths
    .map(width => {
      const separator = src?.includes('?') ? '&' : '?';
      return `${src}${separator}w=${width} ${width}w`;
    })
    .join(', ');
  return <img src={src} srcSet={srcSet} {...rest} />;
};

export default ResponsiveImage;
