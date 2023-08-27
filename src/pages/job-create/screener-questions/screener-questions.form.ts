import { noEmptyString } from '@core/form/customValidators/customValidators';
import { CreateQuestionWizard } from '@store/reducers/createQuestionWizard.reducer';
import { FormModel } from '@core/form/useForm/useForm.types';

export function formModel(formState: CreateQuestionWizard): FormModel {
  const choicesValidation = Object.keys(formState.choices).map((key) => {
    return {
      [key]: {
        initialValue: formState?.choices[key] || '',
        validators: [noEmptyString()],
      },
    };
  });

  const formModelObjects = {
    question: {
      initialValue: formState.question,
      validators: [noEmptyString()],
    },
  };

  return formState.question_type === 'TEXT' ? formModelObjects : Object.assign(formModelObjects, ...choicesValidation);
}
