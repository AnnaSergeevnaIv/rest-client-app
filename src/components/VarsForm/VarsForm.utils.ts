import { hasOwnKeys } from '@/common/utils/index.ts';
import type { VarField, VarsFormData } from './VarsForm.tsx';

const DEFAULT_FIELDS_COUNT = 1;

export const DEFAULT_FORMDATA_VALUES: VarsFormData = {
  vars: Array.from<VarField>({
    length: DEFAULT_FIELDS_COUNT,
  }).fill({ key: '', value: '' }),
};

type PersistedFormData = VarsFormData<unknown>;

type PersistedField = VarField<unknown>;

export const isLikePersistedVarsFormData = (obj: unknown): obj is PersistedFormData => {
  return (
    hasOwnKeys<PersistedFormData>(obj, 'vars') &&
    Array.isArray(obj.vars) &&
    obj.vars.some(v => hasOwnKeys<VarField>(v, 'key', 'value'))
  );
};

export type ParsedVars = {
  plainObject: Record<string, string>;
  normalizedArray: VarField[];
};

export const parseVarFieldsArray = (vars: unknown[]): ParsedVars => {
  const metKeys = new Set<string>();
  const plainObject: Record<string, string> = {};

  const normalizedArray = vars.reduce<VarField[]>((result, item) => {
    if (hasOwnKeys<PersistedField>(item, 'key', 'value') && item.key) {
      const { key, value } = item;

      if (!metKeys.has(key)) {
        const strValue = String(value);
        result.push({ key, value: strValue });
        plainObject[key] = strValue;
        metKeys.add(key);
      }
    }
    return result;
  }, []);

  return {
    normalizedArray,
    plainObject,
  };
};
