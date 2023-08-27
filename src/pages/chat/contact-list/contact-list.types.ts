import { FollowingsReq, Pagination, SummaryReq } from '@core/types';

export type Resolver = {
  summery: Pagination<SummaryReq[]>;
  followings: Pagination<FollowingsReq[]>;
};
