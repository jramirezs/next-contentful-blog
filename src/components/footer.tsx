import React, { useContext } from 'react';

import PersonContext from '@blog/person-context';

const Footer: React.FC = () => {
  const person = useContext(PersonContext);

  return (
    <footer className="bg-main-500 text-white">
      <div className="flex justify-between p-4 max-w-6xl mx-auto text-sm">
        <h3>
          {/* <span className="hidden lg:inline text-base font-semibold">{person.name} - </span> */}
          {person.currentLocation && (
            <span>Sharing inspiration with ❤️ from {person.currentLocation}</span>
          )}
        </h3>
        <h3>© {new Date().getFullYear()}</h3>
      </div>
    </footer>
  );
};

export default Footer;
