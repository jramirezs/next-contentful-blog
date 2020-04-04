/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import PersonContext from '../person-context';
import { getPerson, Person } from '../cms/person';

import '../styles/tailwind.css';

interface Props extends AppProps {
  hostUrl?: string;
  person?: Person;
}

const MyApp = ({ Component, pageProps, person, hostUrl }: Props): JSX.Element => {
  pageProps.hostUrl = hostUrl;

  if (!person) {
    return <Component {...pageProps} />;
  }

  return (
    <PersonContext.Provider value={person}>
      <DefaultSeo
        title={person.name}
        description={person.title}
        twitter={{
          cardType: 'summary',
        }}
        openGraph={{
          title: person.name,
          description: person.title,
          type: 'website',
          url: hostUrl,
          images: [
            {
              url: `https:${person.image.fields.file.url}?w=800`,
              width: 800,
              alt: 'Og image',
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </PersonContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<Partial<Props>> => {
  const appProps = await App.getInitialProps(appContext);

  // TODO: Probably can be handled better
  if (appContext.router.route === '/_error') {
    return { ...appProps };
  }

  // TODO: Probably can be handled better as well
  const { req } = appContext.ctx;
  const hostUrl = `https://${req?.headers.host || req?.headers['x-forwarded-host']}`;

  const person = await getPerson();

  return { ...appProps, person, hostUrl };
};

export default MyApp;
