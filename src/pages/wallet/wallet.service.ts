import { required } from '@core/form';
import { FormModel } from '@core/form/useForm/useForm.types';
import { get } from '@core/http';
import { MissionsResp } from '@core/types';

export async function getMissionsList(payload: { page?: number }): Promise<MissionsResp> {
  return get('/user/missions', {
    params: { 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' },
  }).then(({ data }) => data);
}

export async function getStripeLink(value: string): Promise<any> {
  return get(`/auth/stripe/connect-link?country=${value}`).then(({ data }) => data);
}

export async function getSrtipeProfile(): Promise<any> {
  return get('/auth/stripe/profile').then(({ data }) => data);
}

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};
