import css from './badge.module.scss';
import { BadgeProps } from './badge.types';

const Badge = (props: BadgeProps): JSX.Element => {
  const { value, ...rest } = props;
  return (
    <div style={rest} className={css.container}>
      {value}
    </div>
  );
};

export default Badge;
