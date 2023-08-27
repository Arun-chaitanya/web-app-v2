import { ConfirmOptions, Dialog } from '@capacitor/dialog';
import { useDispatch } from 'react-redux';
import { AlertConfirm } from '@molecules/alert-confirm/alert-confirm';
import { isTouchDevice } from '@core/device-type-detector';
import { closeModal, openModal } from '@store/reducers/modal.reducer';

export const useAlert = () => {
  const dispatch = useDispatch();

  function onClose() {
    dispatch(closeModal());
  }

  const dialog = {
    confirm: async (options: ConfirmOptions, onConfirm: () => void) => {
      if (isTouchDevice()) {
        return Dialog.confirm(options).then(({ value }) => {
          if (value) {
            onConfirm();
          }
        });
      } else {
        dispatch(openModal(<AlertConfirm options={options} onConfirm={onConfirm} onClose={onClose} />));
      }
    },
  };

  return {
    confirm: dialog.confirm,
  };
};
