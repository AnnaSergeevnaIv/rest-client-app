/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { StorageKey } from '@/common/constants/index.ts';
import { hasOwnKeys, JSONParse, omit } from '@/common/utils/index.ts';
import type { VarField, VarsFormData } from './VarsForm.tsx';

const DEFAULT_FIELDS_COUNT = 1;
export const DEFAULT_FORMDATA_VALUES: VarsFormData = {
  vars: Array.from<VarField>({ length: DEFAULT_FIELDS_COUNT }).fill({ key: '', value: '' }),
};

type PersistedFormData = VarsFormData<unknown>;

type PersistedField = VarField<unknown>;

type ParsedVars = {
  plainObject: Record<string, string>;
  array: VarField[];
};

const isLikePersistedVarsFormData = (obj: unknown): obj is PersistedFormData => {
  return (
    hasOwnKeys<PersistedFormData>(obj, 'vars') &&
    Array.isArray(obj.vars) &&
    obj.vars.some(v => hasOwnKeys<VarField>(v, 'key', 'value'))
  );
};

const parseVarFieldsArray = (vars: unknown[]): ParsedVars | null => {
  const varsCopy = [...vars].reverse();
  const obj = Object.create(null) as Record<string, string>;

  const plainObject = varsCopy.reduce<Record<string, string>>((result, item) => {
    if (hasOwnKeys<PersistedField>(item, 'key', 'value') && item.key) {
      const { key, value } = item;

      if (key in result) {
        result = omit(result, key);
      }
      result[key] = String(value);
    }
    return result;
  }, obj);

  const array = Object.entries(plainObject).map(([key, value]) => ({ key, value }));
  if (!array.length) {
    return null;
  }
  return {
    plainObject,
    array: array.reverse(),
  };
};

const getNormalizedPersistedVars = (): ParsedVars | null => {
  const persistedVars = JSONParse(localStorage.getItem(StorageKey.Vars));
  return isLikePersistedVarsFormData(persistedVars)
    ? parseVarFieldsArray(persistedVars.vars)
    : null;
};

export const normalizePersistedVars = (): void => {
  const parsedVars = getNormalizedPersistedVars();
  const persistedFormData: PersistedFormData = {
    vars: parsedVars?.array ?? [],
  };
  localStorage.setItem(StorageKey.Vars, JSON.stringify(persistedFormData));
};

const applyVars = (source: string, customVars?: ParsedVars['plainObject']): string => {
  const persistedVars = customVars ?? getNormalizedPersistedVars()?.plainObject;
  if (!persistedVars) {
    return source;
  }
  return Object.entries(persistedVars).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, value);
  }, source);
};

export const getPersistedFormData = (): VarsFormData => {
  const parsed = getNormalizedPersistedVars();
  return parsed
    ? {
        vars: parsed.array,
      }
    : DEFAULT_FORMDATA_VALUES;
};

export const VarsHelper = {
  apply: applyVars,
  getPersisted: getNormalizedPersistedVars,
  normalizePersited: normalizePersistedVars,
} as const;
