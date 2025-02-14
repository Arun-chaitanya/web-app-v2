import { useState } from 'react';
import css from './textarea.module.scss';
import { TextareaProps } from './textarea.types';
import { printWhen } from 'src/core/utils';

export const Textarea = (props: TextareaProps): JSX.Element => {
  const [outline, setOutline] = useState(false);
  const { optional = false, register, errors = [], variant = 'outline', limit, ...rest } = props;

  function setClassName(v: TextareaProps['variant']) {
    return v ? css.outline : css.default;
  }

  const limitBox = (
    <div className={css.limitBox}>
      <span>{props?.register?.controls[props.name]?.value?.length}</span> / <span>{props.limit}</span>
    </div>
  );

  if (!props.label) {
    return (
      <div
        onFocus={() => setOutline(true)}
        onBlur={() => setOutline(false)}
        className={`${setClassName(variant)} ${css.noLabel}`}
      >
        <textarea
          style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
          id={props.label}
          className={css.textbox}
          role="textbox"
          onChange={(e) => props.onValueChange?.(e.target.value)}
          {...rest}
          maxLength={props.limit}
          {...props?.register?.bind(props?.name)}
        />
        {printWhen(limitBox, !!props.limit)}
      </div>
    );
  }

  return (
    <div onFocus={() => setOutline(true)} onBlur={() => setOutline(false)} className={setClassName(variant)}>
      <label className={`${css.label} ${props.className}`} htmlFor={props.label}>
        {props.label}
      </label>
      <textarea
        style={{ borderColor: outline ? 'var(--color-primary-01)' : '' }}
        id={props.label}
        className={css.textbox}
        role="textbox"
        onChange={(e) => props.onValueChange?.(e.target.value)}
        {...rest}
        maxLength={props.limit}
        {...props?.register?.bind(props.name)}
      />
      {printWhen(limitBox, !!props.limit)}
    </div>
  );
};
