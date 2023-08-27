import css from './items.module.scss';
import { ItemsProps } from './items.types';

const Items = ({ title, value, onClick }: ItemsProps) => {
  return (
    <div onClick={() => onClick(title, value)} className={css.content}>
      {title}
    </div>
  );
};

export default Items;
