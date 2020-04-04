import React, { useRef, useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Error from 'next/error';

import { format } from 'date-fns';

import Link from 'next/link';

import Layout from '../../components/layout';
import Navbar from '../../components/nav';
import Footer from '../../components/footer';
import BlogCard from '../../components/blog-card';
import SocialShare from '../../components/social-share';
import ContentfulRichTextContent from '../../components/contentful-rich-text-content';

import PersonContext from '../../person-context';
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getRecentBlogPosts,
  BlogPost,
} from '../../cms/blogPosts';
import { useRouter } from 'next/router';

interface Props {
  blogPost: BlogPost | null;
  relatedBlogPosts?: BlogPost[];
  hostUrl?: string;
}

const IndexPage: NextPage<Props> = ({ blogPost, relatedBlogPosts, hostUrl }) => {
  const person = useContext(PersonContext);
  const blogContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentUrl = `${hostUrl}${router.asPath}`;

  if (!blogPost) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout title={`${blogPost.title} | ${person.name}`}>
      <NextSeo
        title={blogPost.title}
        description={blogPost.description}
        openGraph={{
          title: blogPost.title,
          description: blogPost.description,
          images: [
            {
              url: `https:${blogPost.heroImage.fields.file.url}?w=800`,
              alt: 'Og image',
            },
          ],
        }}
      />
      <Navbar />
      <header
        className="w-full lg:-mb-32 bg-main-500 h-48 lg:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${blogPost.heroImage.fields.file.url}?w=1024)`,
        }}
      />
      <div>
        <div className="lg:max-w-4xl lg:mx-auto">
          {hostUrl && (
            <div className="relative">
              <SocialShare
                parentRef={blogContentRef}
                className="lg:rounded-l lg:-ml-16"
                url={currentUrl}
              />
            </div>
          )}

          <main ref={blogContentRef} className="rounded bg-white p-4 lg:py-8 lg:px-12 lg:shadow-lg">
            <div>
              <div className="mb-4">
                <p className="uppercase text-main-500 font-semibold text-sm mb-4">
                  {blogPost.category}{' '}
                  {!!blogPost.readingTime && `- ${blogPost.readingTime} min read`}
                </p>
                <h1 className="font-bold text-2xl lg:text-3xl">{blogPost.title}</h1>
                <div className="leading-loose my-4">
                  <p className="text-gray-800 mb-4">
                    🗓 {format(new Date(blogPost.publishDate), 'LLLL do, yyyy')}
                  </p>
                  <p className="font-serif text-gray-800">{blogPost.description}</p>
                </div>
              </div>
              <hr className="my-8 lg:mt-4" />
              <div id="blog-body" className="leading-loose">
                <ContentfulRichTextContent content={blogPost.body} />
              </div>
            </div>
          </main>
        </div>

        <div className="relative z-10 mt-4 p-2 lg:p-4 lg:max-w-6xl lg:mx-auto">
          <div className="mb-8 flex justify-between items-baseline">
            <h2 className="font-normal text-2xl text-gray-800">Other posts</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 mb-8">
            {relatedBlogPosts?.map(blog => (
              <Link key={blog.slug} href="/blog/[id]" as={`/blog/${blog.slug}`} passHref>
                <a>
                  <BlogCard
                    heroUrl={blog.heroImage.fields.file.url}
                    title={blog.title}
                    category={blog.category}
                    description={blog.description}
                    publishDate={blog.publishDate}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {/* Contenful list hack since renders <p> inside <li> */}
      <style jsx global>{`
        #blog-body ul li p,
        #blog-body ol li p {
          display: inline;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { id } = context.query;
  const slug = typeof id === 'string' ? id : id[0];

  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    return { props: { blogPost: null } };
  }

  let relatedBlogPosts = await getRelatedBlogPosts({
    id: blogPost.id,
    category: blogPost.category,
    limit: 3,
  });

  if (!relatedBlogPosts.length) {
    relatedBlogPosts = await getRecentBlogPosts({ omit: [blogPost.id], limit: 3 });
  }

  return { props: { blogPost, relatedBlogPosts } };
};

export default IndexPage;
