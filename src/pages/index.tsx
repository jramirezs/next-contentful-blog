import React from 'react';
import { NextPage, GetServerSideProps } from 'next';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import Layout from '@blog/components/layout';
import BlogCard from '@blog/components/blog-card';
import ContentfulRichTextContent from '@blog/components/contentful/rich-text-content';

import { getRecentBlogPosts, BlogPost } from '@blog/cms/blogPosts';
import { getPerson, Person } from '@blog/cms/person';

interface Props {
  person: Person;
  recentBlogPosts: BlogPost[];
}

const IndexPage: NextPage<Props> = ({ recentBlogPosts, person }) => {
  return (
    <Layout title={`${person.name} | ${person.title}`}>
      <div className="flex flex-wrap lg:h-screen">
        <div
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--color-main-500), var(--color-main-600))',
          }}
          className="relative w-full lg:w-1/4 text-center lg:text-right bg-main-500 text-white"
        >
          {/* <div
            className="absolute top-0 w-full h-full opacity-25 z-0"
            style={{
              backgroundAttachment: 'fixed',
              backgroundImage: 'url(https://source.unsplash.com/yp18P2eKSr0)',
              backgroundRepeat: 'no-repeat',
              backgroundPositionY: 'center',
              backgroundPositionX: 'initial',
            }}
          ></div> */}
          <div className="relative z-10 p-8 lg:px-12 lg:pt-12 xl:pt-24 lg:sticky lg:top-0 lg:h-screen">
            <div className="lg:flex lg:flex-col lg:justify-between h-full">
              <div className="mb-8 lg:mb-0">
                <span className="inline-block w-32 lg:w-48 mb-4 lg:mb-8">
                  <img
                    className="w-full rounded-full"
                    src={`${person.image?.fields.file.url}?w=250&h=250&fit=fill`}
                    alt="avatar"
                  />
                </span>
                <h1 className="font-normal text-xl lg:text-lg xl:text-xl lg:leading-relaxed whitespace-pre-line">
                  {person.shortBio}
                </h1>
              </div>
              <div className="lg:flex lg:justify-evenly">
                {person.email && (
                  <a href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mx-4 lg:mx-0 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                      size="2x"
                    />
                  </a>
                )}
                {person.facebook && (
                  <a href={person.facebook} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="mx-4 lg:mx-0 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                      size="2x"
                    />
                  </a>
                )}
                {person.twitter && (
                  <a href={person.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="mx-4 lg:mx-0 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                      size="2x"
                    />
                  </a>
                )}
                {person.linkedIn && (
                  <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="mx-4 lg:mx-0 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                      size="2x"
                    />
                  </a>
                )}
                {person.cv && (
                  <a
                    href={person.cv.fields.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Curriculum Vitae"
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="mx-4 lg:mx-0 transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-200"
                      size="2x"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 px-4 py-8 md:px-8 lg:py-8 lg:px-12 overflow-scroll">
          {person.longBio && (
            <>
              <div>
                <p className="lg:text-lg leading-loose">
                  <ContentfulRichTextContent content={person.longBio} />
                </p>
              </div>
              <hr className="my-4 lg:my-8" />
            </>
          )}
          <div>
            <h2 className="font-normal text-2xl mb-8 text-gray-800">Recent blog posts</h2>
            <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 mb-8 lg:mb-12">
              {recentBlogPosts.map(blog => (
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
            <div className="text-center">
              <Link href="/blog" passHref>
                <a className="text-main-500 border border-main-500 font-semibold py-2 px-4 rounded">
                  💬 See more posts
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [person, recentBlogPosts] = await Promise.all([
    getPerson({ allFields: true }),
    getRecentBlogPosts({ limit: 4 }),
  ]);

  return { props: { person, recentBlogPosts } };
};

export default IndexPage;
