import type { GetServerSideProps, NextPage } from 'next';

import { Layout } from '@blog/components/layout';
import { Navbar } from '@blog/components/nav';
import { Container } from '@blog/components/container';
import { Footer } from '@blog/components/footer';
import { ContentfulRichTextContent } from '@blog/components/contentful/rich-text-content';

import { getPerson, Person } from '@blog/cms/person';

interface Props {
  person: Person;
}

const AboutPage: NextPage<Props> = ({ person }) => {
  return (
    <Layout title={`${person.name} | ${person.title}`}>
      <div className="md:h-screen md:flex md:flex-col">
        <Navbar headerTitle="About" />
        <main className="md:flex-grow bg-gray-200">
          <Container className="md:py-8 lg:py-16">
            <div className="md:flex">
              <div className="md:px-6 lg:px-0 md:w-1/3">
                <img
                  className={'animate-slow-fade-in block mx-auto w-full transition-opacity duration-1000 ease-in-out'}
                  src="https://unsplash.com/photos/nRwJaWg7McU"
                  alt="Portrait"
                />
              </div>
              <div className="px-6 xl:px-16 md:w-2/3">
                <div className="leading-loose">
                  <ContentfulRichTextContent content={person.longBio} />
                </div>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [person] = await Promise.all([getPerson({ allFields: true })]);

  return { props: { person } };
};

export default AboutPage;
