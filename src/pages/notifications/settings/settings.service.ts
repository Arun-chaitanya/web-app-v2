import { get } from '@core/http';

export async function getSettingsItems() {
  return get('notifications/settings').then(({ data }) => data);
}
