/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { RoutePath, StorageKey } from '@/common/constants/index.ts';
import { showErrorToast } from '@/common/utils/index.ts';
import { useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import { useCallback, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { toast } from 'react-toastify';
import { useAuth } from '../ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { Button } from '../UI/Button/Button.tsx';
import { Input } from '../UI/Input/Input.tsx';
import style from './AuthForm.module.scss';
import { validator } from './AuthForm.utils.ts';
import { useTranslations } from 'next-intl';

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
  const tAuth = useTranslations('AuthForm');
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

  const onSubmit = handleSubmit(data => {
    const action = login ? signin : signup;
    action(data)
      .then(({ user }) => {
        toast.success(`Welcome, ${user.email ?? ANON_USER}`);
        router.replace({ pathname: RoutePath.Home }, { locale });
      })
      .catch((error: unknown) => {
        showErrorToast(error);
      })
      .finally(clearForm);
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <Input
        placeholder={tAuth('email')}
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
        placeholder={tAuth('password')}
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
          placeholder={tAuth('confirmPassword')}
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
