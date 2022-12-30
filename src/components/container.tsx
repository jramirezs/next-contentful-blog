import { clsx } from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children, className }): React.ReactElement => (
  <section className={clsx(className)}>
    <div className="container mx-auto">{children}</div>
  </section>
);
