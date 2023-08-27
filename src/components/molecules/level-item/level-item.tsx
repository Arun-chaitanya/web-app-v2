import ImpactBar from '@atoms/impact-bar';
import LevelBadge from '@atoms/level-badge';
import Typography from '@atoms/typography';
import { LevelsProps } from '@pages/levels/levels.types';

import css from './level-item.module.scss';

export const LevelItem = ({ level }: LevelsProps): JSX.Element => {
  return (
    <div className={css.container}>
      <LevelBadge level={level} size="s" />
      {/* <div className={css.impactBarContainer}>
        <ImpactBar start={0} end={100} current={50} />
      </div> */}
      <Typography className={css.label} type="body" size="s">
        Level {level}
      </Typography>
    </div>
  );
};
