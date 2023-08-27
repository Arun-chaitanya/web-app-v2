import { FollowingsReq, MemberIdentity, Pagination } from '@core/types';

export type Resolver = {
  members: Pagination<MemberIdentity[]>;
  followings: Pagination<FollowingsReq[]>;
};
