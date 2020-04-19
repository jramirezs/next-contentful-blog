import React from 'react';

import { format } from 'date-fns';

interface Props {
  heroUrl: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  type?: 'leading' | 'regular';
}

const transition =
  'transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out';

const BlogCard: React.FC<Props> = ({ heroUrl, title, description, category, publishDate }) => {
  return (
    <div className={`h-full bg-white shadow-lg pb-2 ${transition}`}>
      <div
        className="bg-main-300 bg-cover bg-center h-56 w-full"
        style={{
          backgroundImage: `url('${heroUrl}?w=800&fl=progressive&q=75')`,
        }}
      />
      <div className="p-4">
        <span className="uppercase text-xs font-semibold text-main-500 block">{category}</span>
        <div className="mt-2 md:mt-4 overflow-hidden h-36">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <h4 className="font-light text-gray-800 mb-4 text-sm">
            {format(new Date(publishDate), 'LLLL do, yyyy')}
          </h4>
          <p className="text-gray-800 font-serif text-sm leading-6">{description}</p>
        </div>
      </div>
    </div>
  );
};

const BlogCardLeading: React.FC<Props> = ({
  heroUrl,
  title,
  description,
  category,
  publishDate,
}) => {
  return (
    <div className={`flex flex-wrap h-full bg-white overflow-hidden shadow-lg ${transition}`}>
      <div className="w-full md:w-1/2">
        <div
          className="bg-main-500 bg-cover bg-center h-56 lg:h-80 w-full"
          style={{
            backgroundImage: `url('${heroUrl}?w=800&fl=progressive&q=75')`,
          }}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col flex-grow flex-shrink">
        <div className="flex-1 bg-white overflow-hidden shadow-lg p-4 md:p-6">
          <p className="w-full uppercase text-main-500 font-semibold text-xs md:text-sm">
            {category}
          </p>
          <div className="mt-2 md:mt-4">
            <h3 className="font-bold text-xl text-gray-900">{title}</h3>
            <h4 className="font-light text-gray-800 mb-4 text-sm">
              {format(new Date(publishDate), 'LLLL do, yyyy')}
            </h4>

            <p className="text-gray-800 font-serif text-base">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
export default ({ type, ...rest }: Props): JSX.Element => {
  if (type === 'leading') {
    return <BlogCardLeading {...rest} />;
  }

  return <BlogCard {...rest} />;
};
