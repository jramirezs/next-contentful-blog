import { Fragment, useContext, useState } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

import { PersonContext } from '@blog/person-context';

interface Props {
  headerTitle?: string;
}

export const Navbar: React.FC<Props> = ({ headerTitle }) => {
  const person = useContext(PersonContext);
  const [visible, setVisible] = useState(false);

  return (
    <nav
      className={clsx(
        'flex items-center justify-between flex-wrap bg-main-500 p-4 md:px-6 lg:p-6 w-full sticky top-0 z-20',
        { 'border-b border-main-400': visible }
      )}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="flex">
          <p className="text-2xl font-bold">
            {person.name
              ?.split(' ')
              .map((names) => names[0])
              .join('')}
            .
          </p>
          {headerTitle && (
            <Fragment>
              <p className="text-2xl mx-2">|</p>
              <p className="self-center">{headerTitle}</p>
            </Fragment>
          )}
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={(): void => setVisible((visible) => !visible)}
          className="flex items-center px-3 py-2 border border-main-400 rounded text-main-200 hover:text-white hover:border-white"
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={clsx(
          'w-full block lg:text-right flex-grow lg:flex lg:items-center lg:w-auto',
          'text-center md:text-left pb-4 md:pb-0',
          { hidden: !visible },
          { block: visible }
        )}
      >
        <div className="lg:flex-grow">
          <Link
            href="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-main-200 hover:text-white ease-in-out duration-300"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="lg:ml-8 block mt-4 lg:inline-block lg:mt-0 text-main-200 hover:text-white ease-in-out duration-300"
          >
            Blog
          </Link>
          {person.cv && (
            <a
              href={person.cv.fields.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:ml-8 inline-block px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-main-500 hover:bg-white mt-4 duration-300 ease-in-out lg:mt-0"
            >
              Resume
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
