import { useSelector } from 'react-redux';

import { LinearProgress } from '@mui/material';

import { RootState } from '@store/store';

import css from './spinner.module.scss';

function Spinner(): JSX.Element {
  const spinnerVisibility = useSelector<RootState>((state) => state.spinner);
  return (
    <div
      className={css.container}
      style={{
        opacity: spinnerVisibility ? 1 : 0,
      }}
    >
      <LinearProgress />
    </div>
  );
}

export default Spinner;
