import { ERR_SOMETHING_WRONG } from '@common/constants';
import type { JSX } from 'react';
import { TestId } from '../constants.ts';

export const ProblematicChildMock = ({
  throwError,
  errorMessage,
}: {
  throwError?: boolean;
  errorMessage?: string;
}): JSX.Element => {
  if (throwError) {
    throw Error(errorMessage || ERR_SOMETHING_WRONG);
  }
  return <div data-testid={TestId.ProblematicChildMock}></div>;
};
