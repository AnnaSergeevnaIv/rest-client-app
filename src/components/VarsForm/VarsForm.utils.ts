/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { hasOwnKeys, omit } from '@/common/utils/index.ts';
import type { VarField, VarsFormData } from './VarsForm.tsx';

const DEFAULT_FIELDS_COUNT = 1;

export const DEFAULT_FORMDATA_VALUES: VarsFormData = {
  vars: Array.from<VarField>({
    length: DEFAULT_FIELDS_COUNT,
  }).fill({ key: '', value: '' }),
};

type PersistedFormData = VarsFormData<unknown>;

type PersistedField = VarField<unknown>;

export type ParsedVars = {
  plainObject: Record<string, string>;
  array: VarField[];
};

export const isLikePersistedVarsFormData = (obj: unknown): obj is PersistedFormData => {
  return (
    hasOwnKeys<PersistedFormData>(obj, 'vars') &&
    Array.isArray(obj.vars) &&
    obj.vars.some(v => hasOwnKeys<VarField>(v, 'key', 'value'))
  );
};

export const parseVarFieldsArray = (vars: unknown[], stack?: boolean): ParsedVars | null => {
  const varsCopy = [...vars];
  if (stack) {
    varsCopy.reverse();
  }
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
  if (stack) {
    array.reverse();
  }
  return {
    plainObject,
    array: array,
  };
};
