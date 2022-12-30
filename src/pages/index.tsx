import type { GetServerSideProps, NextPage } from 'next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import { Layout } from '@blog/components/layout';
import { Navbar } from '@blog/components/nav';
import { BlogCard } from '@blog/components/blog-card';
import { Container } from '@blog/components/container';
import { Footer } from '@blog/components/footer';

import { getRecentBlogPosts, BlogPost } from '@blog/cms/blogPosts';
import { getPerson, Person } from '@blog/cms/person';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

interface Props {
  person: Person;
  recentBlogPosts: BlogPost[];
}

const IndexPage: NextPage<Props> = ({ person, recentBlogPosts }) => {
  return (
    <Layout title={`${person.name} | ${person.title}`}>
      <Navbar />
      <main>
        <Container className="bg-main-500 text-white px-4 sm:px-8 md:pt-4">
          <div className="flex flex-col-reverse text-center md:text-left md:flex-row">
            <div className="md:w-2/3 md:pr-16">
              <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl font-serif tracking-wide mt-2 sm:mt-4 md:mt-0">
                Hi! I&apos;m {person.name.split(' ')[0]}
              </h1>
              <div className="mt-8 md:text-lg lg:text-2xl">
                {person.shortBio.split('\n').map((text) => {
                  return (
                    <p key={text} className="mb-4">
                      {text}
                    </p>
                  );
                })}
              </div>
              <div className="mt-12">
                <Link
                  href="/about"
                  className="md:text-lg inline-block pb-4 font-bold border-b-2 border-white hover:text-main-200 hover:border-main-200 duration-300 ease-in-out"
                >
                  Read more about me
                </Link>
              </div>
            </div>
            <div className="text-center flex items-end md:w-1/3 py-4 md:py-0">
              <img
                className={
                  'animate-slow-fade-in block mx-auto bg-main-500 md:bg-trsparent rounded-full md:rounded-none h-36 md:h-[320px] lg:h-[400px] xl:h-[480px]'
                }
                src="/images/portrait-unsplash.png"
                alt="Photo"
              />
            </div>
          </div>
        </Container>
        <Container className="px-4 py-8 lg:py-16">
          <div className="md:flex">
            <div className="md:w-1/3">
              <h1 className="text-xl md:text-2xl font-serif bold mb-4 md:mb-8">
                <FontAwesomeIcon className="text-main-300 mr-4" icon={faLightbulb} />
                <span className="text-main-400 tracking-wide">Blog</span>
              </h1>
              <p className="mb-8 md:mb-16 leading-8">{person.blogHeading}</p>
              <div className="mb-8 text-center">
                <h2 className="flex flex-col-reverse items-center md:flex-col text-lg font-serif bold">
                  <p className="text-main-500">
                    <span>Read Recent posts</span>
                    <span className="ml-2 hidden md:inline">→</span>
                    <span className="ml-2 inline md:hidden">↓</span>
                  </p>
                  <p className="my-2 md:my-4">or</p>
                  <p>
                    <Link
                      href="/blog"
                      className="inline-block border-b-2 text-main-500 border-main-500 hover:text-main-800 transition duration-300 ease-in-out"
                    >
                      See all posts
                    </Link>
                  </p>
                </h2>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <div className="grid gap-4 lg:grid-cols-2">
                {recentBlogPosts.map((blog, index) => (
                  <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                    <BlogCard
                      title={blog.title}
                      category={blog.category}
                      description={blog.description}
                      publishDate={blog.publishDate}
                      latest={index === 0}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
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
