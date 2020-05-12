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

/**
 * Fetches 'person' (blog owner) data
 * @param options.allFields If true brings all person information else it brings only required data in all pages
 */
export const getPerson = async ({ allFields }: { allFields?: boolean } = {}): Promise<Person> => {
  const entries = await client.getEntries<Person>({
    content_type: 'person',
    select: !allFields
      ? ['name', 'title', 'currentLocation', 'slogan', 'email', 'image']
          .map(f => `fields.${f}`)
          .join(',')
      : undefined,
  });

  return entries.items[0].fields;
};
