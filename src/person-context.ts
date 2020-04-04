import { createContext } from 'react';

import { Person } from './cms/person';

const PersonContext = createContext<Partial<Person>>({});

export default PersonContext;
