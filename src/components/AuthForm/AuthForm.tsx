/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { RoutePath } from '@/common/constants/index.ts';
import { redirectAsync, showErrorToast } from '@/common/utils/index.ts';
import { type User } from 'firebase/auth';
import { useLocale } from 'next-intl';
import { useCallback, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { toast } from 'react-toastify';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { Button } from '../UI/Button/Button.tsx';
import { Input } from '../UI/Input/Input.tsx';
import { InputPlaceholder } from './AuthForm.constants.ts';
import style from './AuthForm.module.scss';
import { validator } from './AuthForm.utils.ts';

const LSKEY_FORM_DATA = 'form-data-gft31h';
const ANON_USER = 'anonymous';

type AuthFormProps = {
  login?: boolean;
  submitLabel?: string;
};

type AuthFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const AuthForm = ({ login, submitLabel }: AuthFormProps): ReactNode => {
  const { signin, signup, loading } = useAuth();
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    mode: 'all',
  });

  useFormPersist(LSKEY_FORM_DATA, {
    watch,
    setValue,
    exclude: ['confirmPassword'],
  });

  const clearInput = useCallback(
    (inputName: keyof AuthFormInputs): void => {
      setValue(inputName, '');
      void trigger(inputName);
    },
    [setValue, trigger],
  );

  const redirectOnSuccess = useCallback(
    (user: User, href: string) => {
      reset();
      toast.success(`Welcome, ${user.email ?? ANON_USER}`);
      void redirectAsync({ href, locale });
    },
    [locale, reset],
  );

  const onSubmit = handleSubmit(data => {
    const action = login ? signin : signup;
    action(data)
      .then(({ user }) => {
        redirectOnSuccess(user, RoutePath.Home);
      })
      .catch((error: unknown) => {
        console.debug(error);
        showErrorToast(error);
      });
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <Input
        placeholder={InputPlaceholder.Email}
        autoComplete='on'
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
      {!login && (
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
      <Button className={style.submit} type='submit' label={submitLabel} loading={loading} />
    </form>
  );
};
