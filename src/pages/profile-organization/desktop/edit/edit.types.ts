import { ModalProps } from '@templates/modal/modal.types';
import { PostUpdateProfileResp } from '@core/endpoints/index.types';

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

export interface EditProps extends MakeOptional<ModalProps, 'children'> {
  updateOrganization: (params: PostUpdateProfileResp) => void;
}
