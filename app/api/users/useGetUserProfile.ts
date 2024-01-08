import { useQuery } from '@tanstack/react-query';
import { apiClient, API_METHODS } from '../api-client';
import { Profile } from '../types/profiletypes';

const getProfileFn = async () => {
  const response = await apiClient({
    method: API_METHODS.GET,
    endpoint: 'profiles/me'
  });
  return response.json();
};

export function useGetProfile() {
  const queryResult = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfileFn,
  });

  if (queryResult.isError) {
    console.error('Failed to fetch profile: ', queryResult.error);
  }

  return queryResult;
}
