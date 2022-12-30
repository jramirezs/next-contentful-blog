import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string;
  description: string;
  category: string;
  publishDate: string;
}

export const BlogCardLeading: React.FC<Props> = ({ title, description, category, publishDate }) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-lg border border-white hover:shadow-xl hover:border-main-300 transition duration-300 ease-in-out">
      <div className="flex flex-col justify-between p-6 md:p-8 h-full">
        <h2 className="font-bold font-serif text-xl md:text-2xl mb-8 md:mb-4 flex-grow">{title}</h2>
        <div className="overflow-hidden mb-8">
          <div className="mb-4 md:mb-8 text-center md:text-left">
            <p className="rounded-lg inline-block border bg-main-500 border-main-500 text-white px-4 py-1 md:mr-2 mb-2 md:mb-0">
              <span className="uppercase text-xs font-bold tracking-wide">Latest post</span>
            </p>
            {category && (
              <p className="rounded-lg inline-block border border-main-500 text-main-500 px-4 py-1">
                <span className="uppercase text-xs font-bold tracking-wide">{category}</span>
              </p>
            )}
          </div>
          <p className="text-gray-800">{description}</p>
        </div>
        <p className="font-semibold text-sm text-right">
          <FontAwesomeIcon className="text-main-300 mr-2" icon={faCalendarAlt} />
          <span className="text-main-500">{format(new Date(publishDate), 'LLLL do, yyyy')}</span>
        </p>
      </div>
    </div>
  );
};
