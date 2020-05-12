import React, { useContext, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import PersonContext from '@blog/person-context';

// More like blog navbar but ideally will be extended
const Navbar: React.FC = () => {
  const person = useContext(PersonContext);

  const [visible, setVisible] = useState(false);

  return (
    <nav className="flex items-center bg-main-500 leading-none text-white shadow z-20 sticky top-0 justify-between p-4 lg:px-8">
      <div>
        <span>
          <Link href="/blog" passHref>
            <a>
              <span className="uppercase font-bold">Blog</span>
              <div>
                <span className="text-xs italic">Written by </span>
                <span className="text-sm pl-1 font-semibold">{person.name}</span>
              </div>
            </a>
          </Link>
        </span>
      </div>
      <div>
        <button
          type="button"
          className="focus:outline-none flex items-center md:hidden"
          onClick={(): void => setVisible(visible => !visible)}
        >
          <svg
            className="fill-current w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div
        className={cn(
          'border-t absolute mt-16 w-full top-0 left-0 bg-main-500',
          'md:border-none md:relative md:mt-0 md:w-auto md:block',
          { hidden: !visible },
          { block: visible }
        )}
      >
        <div className="">
          <ul className="flex flex-col md:flex-row py-2 px-4 md:p-0">
            <li>
              <Link href="/" passHref>
                <a className="block hover:underline py-4 md:py-0 md:pr-6">📖 About</a>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <a className="block hover:underline py-4 md:py-0 md:pr-6">📝 Blog</a>
              </Link>
            </li>
            {person.cv && (
              <li className="py-4 md:py-0">
                <a
                  className={cn(
                    'hover:text-main-500 hover:bg-white transition duration-300 ease-in-out',
                    'md:border md:border-white md:text-white md:rounded md:py-2 md:px-4 md:font-semibold'
                  )}
                  href={person.cv.fields.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📚 Resume
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
