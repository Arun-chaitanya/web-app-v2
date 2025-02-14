import { ModalProps } from '@templates/modal/modal.types';

export interface SkillsModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  onBack: () => void;
  onOpen: () => void;
}
