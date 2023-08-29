import clsx from 'clsx';
import { forwardRef, useState } from 'react';

import { printWhen } from '@core/utils';

import css from './input.module.scss';
import { InputProps } from './input.types';

const Input = forwardRef((props: InputProps, ref): JSX.Element => {
  const { optional = false, variant = 'outline', type, inputClassName, ...rest } = props;
  const [outline, setOutline] = useState(false);
  const controlErrors = props?.register?.controls[props.name]?.errors || [];
  const isDirty = props.register?.controls[props.name].isDirty;
  const errors = Object.values(controlErrors) as string[];
  const [passwordVisible, setPasswordVisible] = useState(false);

  const eyeJSX = (
    <div
      style={{ opacity: passwordVisible ? '0.3' : '1' }}
      className={css.eye}
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      <img src="/icons/eye-black.svg" alt="eye" />
    </div>
  );

  const errorsJSX = (
    <div style={{ height: `${errors.length}rem` }} className={css.errorsContainer}>
      {errors.map((error, i) => (
        <div className={css.errorItem} key={i}>
          <>- {error}</>
        </div>
      ))}
    </div>
  );

  function setClassName(v: InputProps['variant']) {
    return v ? css.outline : css.default;
  }

  function setType(type: InputProps['type']) {
    if (type === 'password' && passwordVisible) {
      return 'text';
    } else {
      return type;
    }
  }

  if (props.label) {
    return (
      <div
        onFocus={() => setOutline(true)}
        onBlur={() => setOutline(false)}
        className={clsx(setClassName(variant), props.className)}
      >
        <label className={css.label} htmlFor={props.label}>
          {optional ? (
            <div>
              {props.label} <span className={css.optionalLabel}>(optional)</span>
            </div>
          ) : (
            props.label
          )}
        </label>
        <div className={clsx(css.textbox, outline && css.borderInput, inputClassName)}>
          <input
            className={css.input}
            id={props.label}
            role="textbox"
            type={setType(props.type)}
            {...rest}
            {...props?.register?.bind(props.name)}
          />
          {printWhen(eyeJSX, props.type === 'password')}
        </div>
        {printWhen(errorsJSX, isDirty)}
      </div>
    );
  }

  return (
    <div style={{ gridTemplateRows: '2.5rem' }} className={clsx(setClassName(variant), props.className)}>
      <input
        id={props.label}
        className={clsx(css.textbox, css.input, inputClassName)}
        role="textbox"
        {...rest}
        {...props?.register?.bind(props.name)}
      ></input>
      {printWhen(errorsJSX, isDirty)}
    </div>
  );
});

export default Input;
