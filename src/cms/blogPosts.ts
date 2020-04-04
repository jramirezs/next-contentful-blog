/* eslint-disable @typescript-eslint/camelcase */
import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import readingTime from 'reading-time';
import client from './client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  heroImage: Asset;
  description: string;
  body: Document;
  publishDate: string;
  readingTime?: number;
}

// Retrieve this fields for list views
const fields = ['title', 'slug', 'category', 'heroImage', 'description', 'publishDate'];

const mapFromEntry = (entry: Entry<BlogPost>): BlogPost => ({ id: entry.sys.id, ...entry.fields });

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.slug[in]': slug,
  });

  if (!entries.items.length) {
    return null;
  }

  const blogPost = mapFromEntry(entries.items[0]);
  const postReadingTime = readingTime(documentToPlainTextString(blogPost.body));

  blogPost.readingTime = Math.ceil(postReadingTime.minutes);

  return blogPost;
};

export const getRecentBlogPosts = async ({
  omit = [],
  limit,
}: {
  omit?: string[];
  limit?: number;
}): Promise<BlogPost[]> => {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    select: fields.map(f => `fields.${f}`).join(','),
    'sys.id[nin]': omit.join(','),
    order: '-fields.publishDate',
    limit,
  });

  return entries.items.map(mapFromEntry);
};

export const getRelatedBlogPosts = async ({
  id,
  category,
  limit,
}: {
  id: string;
  category: string;
  limit: number;
}): Promise<BlogPost[]> => {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
    select: fields.map(f => `fields.${f}`).join(','),
    'fields.category[in]': category,
    'sys.id[ne]': id,
    order: '-fields.publishDate',
    limit,
  });

  return entries.items.map(mapFromEntry);
};
