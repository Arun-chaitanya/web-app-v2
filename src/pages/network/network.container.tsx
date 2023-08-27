import { isTouchDevice } from '@core/device-type-detector';
import { Mobile } from './mobile/mobile';
import { Desktop } from './desktop/desktop';

export const Network: React.FC = () => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
