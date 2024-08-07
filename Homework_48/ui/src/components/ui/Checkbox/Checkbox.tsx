import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import classes from './Checkbox.module.css';

interface CCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  id: string;
}

const Checkbox = ({ id, onChange, className, label, ...rest }: CCheckbox) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      <input id={id} type="checkbox" {...rest} onChange={onChange} />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Checkbox;
