import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { IdentityReq } from '@core/types';
import { RootState } from '@store/store';

export const useNetworkShared = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function navigateNetwork(path: string) {
    navigate({ to: `/network/${path}` });
  }

  return {
    navigateNetwork,
    identity,
  };
};
