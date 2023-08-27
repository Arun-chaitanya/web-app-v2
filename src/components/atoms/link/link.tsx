import css from './link.module.scss';
import { LinkProps } from './link.types';

const Link = (props: LinkProps): JSX.Element => {
  const { children, onClick, ...rest } = props;
  return (
    <a onClick={onClick} style={rest} className={css.container}>
      {children}
    </a>
  );
};

export default Link;
