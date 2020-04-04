import React, { useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import Link from 'next/link';
import Layout from '../../components/layout';
import Navbar from '../../components/nav';
import Footer from '../../components/footer';
import BlogCard from '../../components/blog-card';

import PersonContext from '../../person-context';
import { getRecentBlogPosts, BlogPost } from '../../cms/blogPosts';

interface Props {
  blogPosts: BlogPost[];
}

const BlogPage: NextPage<Props> = ({ blogPosts }) => {
  const person = useContext(PersonContext);
  const [latestPost, ...recentPosts] = blogPosts;

  const title = `Blog | ${person.name}`;

  return (
    <Layout title={title}>
      <NextSeo
        title={title}
        description={person.slogan}
        openGraph={{
          title: title,
          description: person.slogan,
          images: [
            {
              url: `/images/background.webp`,
              alt: 'Og image',
            },
          ],
        }}
      />
      <Navbar />
      <header
        style={{
          backgroundImage: 'linear-gradient(90deg, var(--color-main-600), var(--color-main-700))',
        }}
        className="relative w-full bg-main-600"
      >
        <div
          className="absolute top-0 w-full h-full z-0"
          style={{
            opacity: '0.15',
            backgroundImage: 'url(/images/background.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-2 pt-16 pb-24 md:pt-20 md:pb-32 text-center break-normal">
          <p className="text-3xl md:text-4xl text-white font-extrabold">
            <span className="hidden md:inline-block">💻</span> {person.slogan}
          </p>
        </div>
      </header>

      <main className="p-4 max-w-6xl mx-auto -mt-16">
        <div className="mx-0 sm:mx-6">
          <div className="w-full text-xl md:text-2xl text-gray-800">
            {latestPost && (
              <Link href="/blog/[id]" as={`/blog/${latestPost.slug}`} passHref>
                <a>
                  <BlogCard
                    type="leading"
                    heroUrl={latestPost.heroImage.fields.file.url}
                    title={latestPost.title}
                    category={latestPost.category}
                    description={latestPost.description}
                    publishDate={latestPost.publishDate}
                  />
                </a>
              </Link>
            )}

            <div className="mt-12 md:mt-8">
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 mb-8">
                {recentPosts.map(blog => (
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
        </div>
      </main>

      <Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Add a limit when pagination or search in place
  const blogPosts = await getRecentBlogPosts({});

  return { props: { blogPosts } };
};

export default BlogPage;
