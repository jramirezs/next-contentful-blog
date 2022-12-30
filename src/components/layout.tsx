import Head from 'next/head';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ title = 'Site', children }): React.ReactElement => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="bg-gray-200">{children}</div>
  </div>
);
