import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { post } from '@core/http';
import { formModel } from './screener-questions.form';
import {
  setChoices,
  setQuestionType,
  setQuestions,
  setRequiredQuestion,
} from '@store/reducers/createQuestionWizard.reducer';
import { CreatePostPayload, CreateQuestionPayload } from '@core/types';
import { ControlPrimitiveValue } from '@core/form/useForm/useForm.types';

export const QUESTION_TYPE = [
  { value: 'TEXT', label: 'Text' },
  { value: 'MULTIPLE', label: 'Multiple choices' },
];

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
}

export async function createQuestion(payload: CreateQuestionPayload, project_id: string) {
  return post(`/projects/${project_id}/questions`, payload).then(({ data }) => data);
}

export function updateForm(dispatch: Dispatch<AnyAction>) {
  return (fieldName: keyof ReturnType<typeof formModel>, value: ControlPrimitiveValue) => {
    const field: Record<string, () => void> = {
      question_type: () => dispatch(setQuestionType(value)),
      question: () => dispatch(setQuestions(value)),
      required_question: () => dispatch(setRequiredQuestion(value)),
    };
    field[fieldName]();
  };
}
