import { getErrorMessage } from '@/common/utils';
import { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import { addHistoryEntry } from '@/services/firebase/admin/request-history/actions';
import axios from 'axios';
import { describe, vi } from 'vitest';
import { getData } from './getData';

vi.mock('axios', () => ({
  default: vi.fn(),
}));

vi.mock('@/common/utils', () => ({
  getErrorMessage: vi.fn(),
  showErrorToast: vi.fn(),
}));

vi.mock('@/services/firebase/admin/request-history/actions', () => ({
  addHistoryEntry: vi.fn(),
}));

describe('getData', () => {
  vi.mocked(addHistoryEntry).mockResolvedValueOnce('fake_id');
  const mockFormData = {
    url: 'https://example.com',
    method: METHODS.GET,
    headers: [],
    body: undefined,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('should return data', async () => {
    const mockReturnAxiosData = {
      status: 200,
      statusText: 'OK',
      headers: {},
      data: 'some data',
    };
    const mockReturnData = {
      data: {
        status: 200,
        statusText: 'OK',
        headers: {},
        body: 'some data',
      },
      error: null,
    };
    vi.mocked(getErrorMessage).mockReturnValue('');
    vi.mocked(axios).mockResolvedValue(mockReturnAxiosData);
    const result = await getData(mockFormData, 'test-link');
    expect(result).toStrictEqual(mockReturnData);
  });
  test('should return error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(getErrorMessage).mockReturnValue(errorMessage);
    vi.mocked(axios).mockRejectedValue(new Error('Network Error'));
    const result = await getData(mockFormData, 'test-link');
    expect(result).toStrictEqual({
      data: null,
      error: errorMessage,
    });
  });
});
