import { CSSProperties, useMemo, useState } from 'react';
import { endpoint } from '@core/endpoints';
import { JobDetailCard } from '@pages/job-detail/components/job-detail-card/job-detail-card';
import { getScreeningQuestions } from '@pages/job-offer-reject/job-offer-reject.services';
import { DetailOutletProps } from './detail-outlet.types';
import { COUNTRIES_DICT } from '@constants/COUNTRIES';
import { Job } from '@organisms/job-list/job-list.types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { IdentityReq } from '@core/types';
import { UserProfileCard } from '../../components/user-profile-card/user-profile-card';
import { getUserDetail } from '@pages/profile-user/profile-user.services';

export function DetailOutlet(props: DetailOutletProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<null | JSX.Element>(null);

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = (job: Job) =>
    `${job.identity_meta.city}, ${getCountryName(
      job.identity_meta.country as keyof typeof COUNTRIES_DICT | undefined
    )}`;

  useMemo(() => {
    async function getTemplate() {
      if (!props.id) {
        setContent(null);
        return;
      }
      switch (props.type) {
        case 'projects':
          setLoading(true);
          const job = await endpoint.get.projects.project_id(props.id);
          const { questions } = await getScreeningQuestions(props.id);
          const jobDetailCardJSX = (
            <JobDetailCard
              job={job}
              screeningQuestions={questions}
              location={location(job)}
              userType={currentIdentity?.type || 'users'}
            />
          );
          setContent(jobDetailCardJSX);
          setLoading(false);
          break;
        case 'users':
          setLoading(true);
          const user = await getUserDetail(props.id);
          const jsx = <UserProfileCard user={user} />;
          setContent(jsx);
          setLoading(false);
          break;
      }
    }
    getTemplate();
  }, [props.id]);

  const style: CSSProperties = {
    opacity: loading ? '0.5' : '1',
    width: content ? '40rem' : '0',
    transition: 'all 200ms 0ms',
  };

  return <div style={style}>{content}</div>;
}
