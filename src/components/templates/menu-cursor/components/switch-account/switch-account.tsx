import css from './switch-account.module.scss';
import { RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AccountsModel } from 'src/pages/sidebar/mobile/mobile.types';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { logout, setIdentityHeader } from 'src/pages/sidebar/sidebar.service';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { useNavigate } from '@tanstack/react-location';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Divider } from 'src/components/templates/divider/divider';
import { SwitchAccountProps } from './switch-account.types';
import { ChangePasswordModal } from '../change-password-modal/change-password-modal';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { printWhen } from 'src/core/utils';

let timer: NodeJS.Timeout;

export const SwitchAccount = (props: SwitchAccountProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingAccId, setPendingAccId] = useState('');
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [containerStyles, setContainerStyle] = useState<CSSProperties>({});
  const accountList = useSelector<RootState, AccountsModel[]>((state) => {
    return state.identity.entities.map((item) => ({
      name: item.meta.name,
      image: item.meta.image,
      type: item.type,
      id: item.id,
      current: item.current,
    }));
  });

  const openMenu = useCallback(() => {
    setContainerStyle((style) => ({ ...style, display: 'block' }));
    timer = setTimeout(() => {
      setContainerStyle({
        display: 'block',
        opacity: 1,
        transform: 'translateY(0%)',
      });
    }, 50);
  }, []);

  const closeMenu = useCallback(() => {
    setContainerStyle({ opacity: 0, transform: 'translateY(1rem)' });
    timer = setTimeout(() => {
      setContainerStyle((style) => ({ ...style, display: 'none' }));
      props.onClose();
    }, 180);
  }, []);

  function logOut() {
    logout().then(() => navigate({ to: '/sign-in' }));
    props.onClose();
    nonPermanentStorage.clear();
  }

  useEffect(() => {
    props.open ? openMenu() : closeMenu();
    return () => clearTimeout(timer);
  }, [props.open]);

  const switchAccount = async (id: string) => {
    setPendingAccId(id);
    await setIdentityHeader(id);
    getIdentities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then(() => navigate({ to: '/jobs' }))
      .then(closeMenu);
  };

  function accountBgColor(id: string, current: Boolean) {
    if (current) {
      return 'var(--color-primary-01)';
    }
    if (id === pendingAccId) {
      return '#004a4618';
    }
  }

  const createdJobDividerJSX = (
    <Divider title="Jobs">
      <div className={css.settingsMenuContainer}>
        <div onClick={() => navigate({ to: `/jobs/created/${props.identity.id}` })} className={css.menuItem}>
          <span>Created</span>
        </div>
      </div>
    </Divider>
  );

  return (
    <div style={containerStyles} className={css.container}>
      <Divider padding={0}>
        <div className={css.accountList}>
          {accountList.map((item) => (
            <div
              onClick={() => switchAccount(item.id)}
              key={item.id}
              style={{ backgroundColor: accountBgColor(item.id, item.current) }}
              className={css.accountItem}
            >
              <ProfileView type={item.type} name={item.name} img={item.image} theme={item.current ? 'dark' : 'light'} />
            </div>
          ))}
        </div>
      </Divider>
      {printWhen(createdJobDividerJSX, props.identity.type === 'organizations')}
      <Divider title="Settings">
        <div className={css.settingsMenuContainer}>
          <div
            className={css.menuItem}
            onClick={() => {
              closeMenu();
              setChangePassOpen(true);
            }}
          >
            <span>Change password</span>
          </div>
        </div>
      </Divider>
      <Divider>
        <div className={css.settingsMenuContainer}>
          <div onClick={logOut} className={css.menuItem}>
            <span>Log out</span>
          </div>
        </div>
      </Divider>
      <ChangePasswordModal open={changePassOpen} onClose={() => setChangePassOpen(false)} />
    </div>
  );
};
