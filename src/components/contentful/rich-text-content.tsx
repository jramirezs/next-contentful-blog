import Link from 'next/link';

import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, NodeRenderer, Options } from '@contentful/rich-text-react-renderer';

import { ResponsiveImage } from '@blog/components/contentful/responsive-image';
import { emojiReplace } from '@blog/utils/emoji-replace';

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode): JSX.Element => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode): JSX.Element => <i>{text}</i>,
    [MARKS.CODE]: (text: React.ReactNode): JSX.Element => <pre className="whitespace-pre-line">{text}</pre>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: ((_node, children) => <p className="mb-6">{children}</p>) as NodeRenderer,
    [BLOCKS.HEADING_1]: ((_node, children) => <h1 className="font-bold text-2xl mb-4">{children}</h1>) as NodeRenderer,
    [BLOCKS.HEADING_2]: ((_node, children) => (
      <h2 className="font-bold text-xl mt-12 mb-4 leading-normal">{children}</h2>
    )) as NodeRenderer,
    [BLOCKS.HEADING_3]: ((_node, children) => (
      <h3 className="font-bold text-lg mt-12 mb-4">{children}</h3>
    )) as NodeRenderer,
    [BLOCKS.HEADING_4]: ((_node, children) => (
      <h4 className="font-bold text-lg mt-12 mb-4">{children}</h4>
    )) as NodeRenderer,
    [BLOCKS.HEADING_5]: ((_node, children) => (
      <h5 className="font-bold text-base mt-12 mb-4">{children}</h5>
    )) as NodeRenderer,
    [BLOCKS.HEADING_6]: ((_node, children) => (
      <h6 className="font-bold text-sm mt-12 mb-4">{children}</h6>
    )) as NodeRenderer,
    [BLOCKS.OL_LIST]: ((_node, children) => (
      <ol className="list-decimal list-outside ml-8 mb-6">{children}</ol>
    )) as NodeRenderer,
    [BLOCKS.UL_LIST]: ((_node, children) => (
      <ul className="list-disc list-outside ml-8 mb-6">{children}</ul>
    )) as NodeRenderer,
    [BLOCKS.LIST_ITEM]: ((_node, children) => <li className="mb-4 pl-2">{children}</li>) as NodeRenderer,
    [BLOCKS.HR]: (() => <div className="my-8 md:my-12 border-b border-main-300" />) as NodeRenderer,
    [BLOCKS.QUOTE]: ((_node, children) => (
      <blockquote className="w-full my-6 whitespace-pre-line bg-main-300 pl-4">
        <div className="bg-white px-4">{children}</div>
      </blockquote>
    )) as NodeRenderer,
    // [BLOCKS.EMBEDDED_ENTRY]: ((_node, children) => <p>{children}</p>) as NodeRenderer,
    [BLOCKS.EMBEDDED_ASSET]: ((node) => {
      const { fields } = node?.data?.target;
      if (!fields) {
        return null;
      }
      return (
        <div className="flex justify-center my-6">
          <ResponsiveImage className="w-full h-full lg:w-3/4" src={`${fields.file.url}`} alt={fields.title} />
        </div>
      );
    }) as NodeRenderer,
    [INLINES.ENTRY_HYPERLINK]: ((node, children) => {
      const entryType = node.data.target?.sys?.contentType?.sys?.id;

      if (entryType === 'blogPost') {
        return (
          <Link
            href={`/blog/${node.data.target.fields.slug}`}
            className="text-main-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </Link>
        );
      }

      return null;
    }) as NodeRenderer,
    [INLINES.HYPERLINK]: ((node, children) => (
      <a className="text-main-500 underline" href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )) as NodeRenderer,
  },
  renderText: (text) => emojiReplace(text),
};

interface Props {
  content: Document;
}

export const ContentfulRichTextContent: React.FC<Props> = ({ content }) => {
  const Component = documentToReactComponents(content, options);
  return <>{Component}</>;
};
