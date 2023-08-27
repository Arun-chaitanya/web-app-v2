import { Job } from '@organisms/job-list/job-list.types';
import { QuestionsRes } from '@core/types';

export type JobDetailCardProps = {
  job: Job;
  screeningQuestions: QuestionsRes['questions'];
  location: string;
  userType: 'organizations' | 'users';
};
