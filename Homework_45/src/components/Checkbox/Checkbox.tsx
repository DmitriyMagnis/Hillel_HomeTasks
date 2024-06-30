import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import classes from './Checkbox.module.css';

interface CCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const Checkbox = ({ onChange, className, label, name, ...rest }: CCheckbox) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      <input id={name} type="checkbox" {...rest} onChange={onChange} />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Checkbox;
