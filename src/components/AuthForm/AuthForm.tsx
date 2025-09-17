/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { RoutePath, StorageKey } from '@/common/constants/index.ts';
import { showErrorToast } from '@/common/utils/index.ts';
import { useRouter } from '@/i18n/navigation.ts';
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
  const router = useRouter();
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

  const { clear: clearForm } = useFormPersist(StorageKey.AuthForm, {
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
    (user: User, pathname: string) => {
      clearForm();
      toast.success(`Welcome, ${user.email ?? ANON_USER}`);
      router.replace({ pathname }, { locale });
    },
    [locale, clearForm, router],
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
