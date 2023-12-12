import { useQuery } from '@tanstack/react-query';
import { apiClient, API_METHODS } from '../api-client';
import { useAuthUser } from './useAuthorizeUser';
import { mmkvStorage } from '../../lib/mmkv';

export function useGetProfile() {
  const userId = mmkvStorage.getString("userid")

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await apiClient({
        method: API_METHODS.GET,
        endpoint: `profiles/${userId}`,
        data: null
      });
      const data = await response.json();
      return data;
    },
  });
}