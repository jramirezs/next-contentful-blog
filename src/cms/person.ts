/* eslint-disable @typescript-eslint/camelcase */
import client from './client';
import { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface Person {
  name: string;
  title: string;
  currentLocation: string;
  shortBio: string;
  longBio: Document;
  slogan: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  image: Asset;
  cv: Asset;
}

export const getPerson = async (): Promise<Person> => {
  const entries = await client.getEntries<Person>({
    content_type: 'person',
  });

  return entries.items[0].fields;
};
