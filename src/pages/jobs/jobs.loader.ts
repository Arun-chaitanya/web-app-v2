import { getIdentities } from '@core/api';
import { setIdentityList } from '@store/reducers/identity.reducer';
import store from '@store/store';

export async function jobsPageLoader() {
  try {
    const resp = await getIdentities();
    store.dispatch(setIdentityList(resp));
    return resp;
  } catch {
    // window.location.replace('/intro');
    return {};
  }
}
