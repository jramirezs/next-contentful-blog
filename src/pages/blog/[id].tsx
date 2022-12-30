import React, { useRef, useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { format } from 'date-fns';

import Link from 'next/link';
import { Layout } from '@blog/components/layout';
import { Navbar } from '@blog/components/nav';
import { Container } from '@blog/components/container';
import { Footer } from '@blog/components/footer';
import { BlogCard } from '@blog/components/blog-card';
import { SocialShare } from '@blog/components/social-share';
import { ContentfulRichTextContent } from '@blog/components/contentful/rich-text-content';

import { PersonContext } from '@blog/person-context';
import { getBlogPostBySlug, getRelatedBlogPosts, getRecentBlogPosts, BlogPost } from '@blog/cms/blogPosts';
import { faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  blogPost: BlogPost;
  relatedBlogPosts?: BlogPost[];
  hostUrl?: string;
}

const IndexPage: NextPage<Props> = ({ blogPost, relatedBlogPosts, hostUrl }) => {
  const person = useContext(PersonContext);
  const blogContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentUrl = `${hostUrl}${router.asPath}`;

  return (
    <Layout title={`${blogPost.title} | ${person.name}`}>
      <NextSeo
        title={blogPost.title}
        description={blogPost.description?.trim()}
        openGraph={{
          title: blogPost.title,
          description: blogPost.description?.trim(),
        }}
      />
      <Navbar headerTitle="Blog" />
      <div>
        <Container className="bg-white">
          <div className="md:flex">
            <div className="md:w-1/4 md:px-4 md:relative">
              {hostUrl && <SocialShare parentRef={blogContentRef} url={currentUrl} />}
            </div>
            <main ref={blogContentRef} className="md:w-3/4 p-4 lg:py-8 lg:px-16">
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold uppercase mb-2">
                  <FontAwesomeIcon className="text-gray-500 mr-2" icon={faCalendarAlt} />
                  {format(new Date(blogPost.publishDate), 'LLLL do, yyyy')}
                </p>
                <h1 className="font-semibold font-serif tracking-wide text-3xl lg:text-4xl mb-8 md:mb-2">
                  {blogPost.title}
                </h1>
                <div className="text-center md:text-left mb-8">
                  {blogPost.category && (
                    <p className="rounded-full inline-block border border-main-500 text-main-500 px-4 py-1 mb-4 md:mb-0">
                      <span className="uppercase text-xs font-bold tracking-wide">{blogPost.category}</span>
                    </p>
                  )}
                  <p className="rounded-full inline-block border border-main-500 text-main-500 px-4 py-1 ml-2">
                    <span className="uppercase text-xs font-bold tracking-wide">
                      {!!blogPost.readingTime && `${blogPost.readingTime} min read`}
                    </span>
                  </p>
                </div>
                <p className="text-gray-700 leading-loose font-semibold">{blogPost.description}</p>
              </div>
              <div className="my-8 md:my-12 border-b border-main-300" />
              <div id="blog-body" className="leading-loose">
                <ContentfulRichTextContent content={blogPost.body} />
              </div>
            </main>
          </div>
        </Container>

        <Container className="px-4 py-8 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif bold mb-4">
              <FontAwesomeIcon className="hidden md:inline-block text-main-300 mr-2" icon={faPlus} />
              <span className="text-main-400 tracking-wide">Other {blogPost.category?.toLowerCase()} posts</span>
            </h1>
            <p>There&apos;s more where that came from</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedBlogPosts?.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                <BlogCard
                  title={blog.title}
                  category={blog.category}
                  description={blog.description}
                  publishDate={blog.publishDate}
                />
              </Link>
            ))}
          </div>
        </Container>
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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;

  if (!id) {
    return { notFound: true };
  }

  const slug = typeof id === 'string' ? id : id[0];

  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    return { notFound: true };
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
