import { IdentityReq } from '@core/types';

export type SwitchAccountProps = {
  open: boolean;
  identity?: IdentityReq;
  onClose: () => void;
};
