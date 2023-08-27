import { required } from '@core/form';
import { FormModel } from '@core/form/useForm/useForm.types';
import { endpoint } from '@core/endpoints/index';
import { get } from '@core/http';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  return { offer };
}

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}

export async function getStripeLink(country: string, is_jp?: boolean): Promise<any> {
  return get('/auth/stripe/connect-link', { params: { country, is_jp } }).then(({ data }) => data);
}

export async function getSrtipeProfile(is_jp?: boolean): Promise<any> {
  return get('/auth/stripe/profile', { params: { is_jp } }).then(({ data }) => data);
}

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};
