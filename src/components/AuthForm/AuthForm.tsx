/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useCallback, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button/Button.tsx';
import { Input } from '../UI/Input/Input.tsx';
import { InputPlaceholder } from './AuthForm.constants.ts';
import style from './AuthForm.module.scss';
import { validator } from './AuthForm.utils.ts';

type AuthFormProps = {
  signup?: boolean;
  submitText?: string;
};

type AuthFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const AuthForm = ({ signup, submitText }: AuthFormProps): ReactNode => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    mode: 'all',
  });

  const onSubmit = handleSubmit(data => {
    console.debug(data);
  });

  const clearInput = useCallback(
    (inputName: keyof AuthFormInputs): void => {
      setValue(inputName, '');
      void trigger(inputName);
    },
    [setValue, trigger],
  );

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <Input
        placeholder={InputPlaceholder.Email}
        error={errors.email?.message}
        onClear={() => {
          clearInput('email');
        }}
        {...register('email', {
          validate: validator.email,
        })}
      />
      <Input
        placeholder={InputPlaceholder.Password}
        type='password'
        error={errors.password?.message}
        onClear={() => {
          clearInput('password');
        }}
        {...register('password', {
          validate: validator.password,
        })}
      />
      {signup && (
        <Input
          type='password'
          placeholder={InputPlaceholder.Confirm}
          error={errors.confirmPassword?.message}
          onClear={() => {
            clearInput('confirmPassword');
          }}
          {...register('confirmPassword', {
            validate: value =>
              !errors.password && validator.confirmPassword(value, watch('password')),
          })}
        />
      )}
      <Button className={style.submit} type='submit' label={submitText} />
    </form>
  );
};
