import Button from '@atoms/button';
import css from './change-password-modal.module.scss';
import Header from '@atoms/header-v2';
import Input from '@atoms/input';
import { Modal } from '@templates/modal/modal';
import { printWhen } from '@core/utils';
import { useChangePasswordShared } from '@pages/change-password/change-password.shared';
import { ChangePasswordModalProps } from './change-password-types';
import { dialog } from '@core/dialog/dialog';

export const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
  const { form, notMatchingPasswords, formIsValid, onSubmitDesktop } = useChangePasswordShared();

  function onChangePasswordSubmit() {
    const cb = () =>
      dialog.alert({ title: 'Successful', message: 'Password has been successfully changed' }).then(props.onClose);
    onSubmitDesktop(cb);
  }

  return (
    <Modal zIndex={3} height="38rem" width="28.75rem" open={props.open} onClose={props.onClose}>
      <div className={css.container}>
        <div>
          <Header title="Change Password" onBack={() => props.onClose()} />
        </div>
        <form className={css.form}>
          <Input
            autoComplete="password"
            register={form}
            name="current_password"
            label="Current password"
            type="password"
            placeholder="Current password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="password"
            label="New password"
            type="password"
            placeholder="New password"
          />
          <Input
            autoComplete="new-password"
            register={form}
            name="confirm_new_password"
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
          />
          {printWhen(<p className={css.passNotMatch}>- Passwords do not match</p>, notMatchingPasswords)}
        </form>
        <div className={css.bottom}>
          <Button disabled={!formIsValid} onClick={onChangePasswordSubmit} color="blue">
            Change your password
          </Button>
        </div>
      </div>
    </Modal>
  );
};
