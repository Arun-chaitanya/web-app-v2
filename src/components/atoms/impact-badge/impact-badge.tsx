import css from './impact-badge.module.scss';
import { ImpactBadgeProps } from './impact-badge.types';

const ImpactBadge = (props: ImpactBadgeProps): JSX.Element => {
  return (
    <div
      role="button"
      style={{ backgroundColor: props.color, width: props?.size, height: props?.size }}
      className={css.container}
    >
      <img src={props.iconUrl} />
    </div>
  );
};

export default ImpactBadge;
