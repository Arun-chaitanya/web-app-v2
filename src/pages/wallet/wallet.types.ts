import { MissionsResp, StripeLinkResp, StripeProfileResp } from '@core/types';

export type Resolver = { missionsList: MissionsResp; stripeProfile: StripeProfileResp };

export type RespPayout = { message: string; transaction_id: string };
