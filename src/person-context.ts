import { createContext } from 'react';

import type { Person } from '@blog/cms/person';

export const PersonContext = createContext<Partial<Person>>({});
