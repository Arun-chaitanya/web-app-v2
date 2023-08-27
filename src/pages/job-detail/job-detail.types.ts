import { MakeGenerics } from '@tanstack/react-location';
import { Job } from '@organisms/job-list/job-list.types';
import { QuestionsRes } from '@core/types';

export type JobDetailProps = {};

export type Loader = MakeGenerics<{
  LoaderData: Job;
}>;

export type Resolver = {
  jobDetail: Job;
  screeningQuestions: QuestionsRes;
};
