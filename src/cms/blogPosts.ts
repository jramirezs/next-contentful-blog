import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import readingTime from 'reading-time';

import { client } from './client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  body: Document;
  publishDate: string;
  readingTime?: number;
}

// Retrieve only these fields for list views
const fields = ['title', 'slug', 'category', 'description', 'publishDate'] as const;

const mapFromEntry = (entry: Entry<BlogPost>): BlogPost => ({ ...entry.fields, id: entry.sys.id });

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
    select: fields.map((f) => `fields.${f}`).join(','),
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
    select: fields.map((f) => `fields.${f}`).join(','),
    'fields.category[in]': category,
    'sys.id[ne]': id,
    order: '-fields.publishDate',
    limit,
  });

  return entries.items.map(mapFromEntry);
};
