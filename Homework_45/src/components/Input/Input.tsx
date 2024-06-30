import classNames from 'classnames';
import { ChangeEvent, memo } from 'react';
import classes from './input.module.css';

interface CInput {
  name: string;
  title?: string;
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string | null;
}

const Input = ({
  name,
  title,
  className,
  value,
  onChange,
  placeholder,
  error,
}: CInput) => {
  return (
    <div
      className={classNames(classes.inputGroup, className, {
        [classes.error]: Boolean(error),
      })}
    >
      {title && <label htmlFor={name}>{title}</label>}
      <input
        id={name}
        className={classes.input}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(Input);
