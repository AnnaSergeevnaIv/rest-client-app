import { StorageKey } from '@/common/constants/index.ts';
import { hasOwnKeys, JSONParse } from '@/common/utils/index.ts';
import type { VarField, VarsFormData } from './VarsForm.tsx';

const DEFAULT_FIELDS_COUNT = 1;
export const DEFAULT_FORMDATA_VALUES: VarsFormData = {
  vars: Array.from<VarField>({ length: DEFAULT_FIELDS_COUNT }).fill({ key: '', value: '' }),
};

type ParsedVars = {
  plainObject: Record<string, string>;
  array: VarField[];
};
type PersistedFormData = VarsFormData<unknown>;
type PersistedField = VarField<unknown>;

const isLikePersistedFormData = (obj: unknown): obj is PersistedFormData => {
  return (
    hasOwnKeys<PersistedFormData>(obj, 'vars') &&
    Array.isArray(obj.vars) &&
    obj.vars.some(v => hasOwnKeys<VarField>(v, 'key', 'value'))
  );
};

const parseVarFieldsArray = (vars: unknown[]): ParsedVars | null => {
  const plainObject = vars.reduce<Record<string, string>>((result, item) => {
    if (hasOwnKeys<PersistedField>(item, 'key', 'value') && item.key) {
      result[item.key] = String(item.value);
    }
    return result;
  }, {});
  const array = Object.entries(plainObject).map(([key, value]) => ({ key, value }));
  if (!array.length) {
    return null;
  }
  return {
    plainObject,
    array,
  };
};

const getNormalizedPersistedVars = (): ParsedVars | null => {
  const persistedVars = JSONParse(localStorage.getItem(StorageKey.Vars));
  return isLikePersistedFormData(persistedVars)
    ? parseVarFieldsArray(persistedVars.vars.reverse())
    : null;
};

export const normalizePersistedVars = (): void => {
  const parsedVars = getNormalizedPersistedVars();
  const persistedFormData: PersistedFormData = {
    vars: parsedVars?.array.reverse() ?? [],
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
        vars: parsed.array.reverse(),
      }
    : DEFAULT_FORMDATA_VALUES;
};

export const VarsHelper = {
  apply: applyVars,
  getPersisted: getNormalizedPersistedVars,
  normalizePersited: normalizePersistedVars,
} as const;
