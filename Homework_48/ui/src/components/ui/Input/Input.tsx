import classNames from 'classnames';
import { ChangeEvent, memo, type HTMLAttributes } from 'react';
import classes from './input.module.css';

interface CInput extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string | null;
}

const Input = memo(
  ({
    name,
    title,
    className,
    value,
    onChange,
    placeholder,
    error,
    ...rest
  }: CInput) => {
    return (
      <div
        className={classNames(classes.inputGroup, className, {
          [classes.error]: Boolean(error),
        })}
      >
        {title && <label htmlFor={name}>{title}</label>}
        <input
          name={name}
          className={classes.input}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
          {...rest}
        />

        {error && (
          <p data-testid="error-msg" className={classes.errorMsg}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
