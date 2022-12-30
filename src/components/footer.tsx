import { useContext } from 'react';

import { PersonContext } from '@blog/person-context';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer: React.FC = () => {
  const person = useContext(PersonContext);

  return (
    <footer className="bg-main-500 text-white">
      <div className="container mx-auto text-center py-6">
        <div className="mb-4">
          <h3 className="md:text-lg font-bold mb-2">
            {person.name} © {new Date().getFullYear()}
          </h3>
          <div className="text-2xl">
            {person.email && (
              <a href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mx-2 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                />
              </a>
            )}
            {person.facebook && (
              <a href={person.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="mx-2 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                />
              </a>
            )}
            {person.twitter && (
              <a href={person.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="mx-2 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                />
              </a>
            )}
            {person.linkedIn && (
              <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="mx-2 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                />
              </a>
            )}
          </div>
        </div>
        {person.currentLocation && (
          <div className="text-xs md:text-sm">
            <p>Sharing inspiration with ❤️ from {person.currentLocation}</p>
          </div>
        )}
      </div>
    </footer>
  );
};
