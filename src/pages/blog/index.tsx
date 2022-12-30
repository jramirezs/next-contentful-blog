import { useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import Link from 'next/link';
import { Layout } from '@blog/components/layout';
import { Navbar } from '@blog/components/nav';
import { Footer } from '@blog/components/footer';
import { BlogCard } from '@blog/components/blog-card';

import { emojiReplace } from '@blog/utils/emoji-replace';

import { PersonContext } from '@blog/person-context';
import { getRecentBlogPosts, BlogPost } from '@blog/cms/blogPosts';
import { BlogCardLeading } from '@blog/components/blog-card-leading';

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
        }}
      />
      <Navbar headerTitle="Blog" />
      <header className="relative w-full bg-main-500">
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
        {person.slogan && (
          <div className="relative z-10 max-w-4xl mx-auto px-2 pt-16 pb-24 md:pt-8 md:pb-24 text-center break-normal">
            <p className="text-3xl md:text-4xl text-white font-extrabold">{emojiReplace(person.slogan)}</p>
          </div>
        )}
      </header>

      <main className="relative z-10 p-4 max-w-6xl mx-auto -mt-16">
        <div className="mx-0 sm:mx-6">
          <div>
            {latestPost && (
              <Link href={`/blog/${latestPost.slug}`}>
                <BlogCardLeading
                  title={latestPost.title}
                  category={latestPost.category}
                  description={latestPost.description}
                  publishDate={latestPost.publishDate}
                />
              </Link>
            )}

            <div className="mt-12 md:mt-8">
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {recentPosts.map((blog) => (
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
