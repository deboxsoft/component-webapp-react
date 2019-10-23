import React, { useRef } from 'react';
import nanoid from 'nanoid';
import { useField, Field, FieldProps } from 'react-final-form';
import { FormControl } from './FormControl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props extends FieldProps<any, any> {
  name: string;
  label: string;
  placeholder?: string;
}

type ErrorProps = Partial<Props>;

const Error = ({ name = '' }: ErrorProps) => {
  const {
    meta: { touched, error }
  } = useField(name, { subscription: { touched: true, error: true } });
  return touched && error ? <span>{error}</span> : null;
};

export default ({ name, label, ...attribs }: Props) => {
  const id = useRef(`field-${nanoid()}`);
  return (
    <div>
      <label htmlFor={id.current}>{label}</label>
      <Field id={id.current} name={name} component={FormControl} {...attribs} />
      <Error name={name} />
    </div>
  );
};
