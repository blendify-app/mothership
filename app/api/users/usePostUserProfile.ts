import { useMutation } from '@tanstack/react-query'
import { apiClient, API_METHODS } from '../api-client';
import { Profile, Basic, Demographics, Personality, Life, Additional } from '../types/profiletypes';

const postProfileFn = async (profile: Profile | Basic | Demographics | Personality | Life | Additional) => {
  const response = await apiClient({
    method: API_METHODS.POST,
    endpoint: "profiles/edit",
    data: profile
  });
  return response.json();
};

export function usePostProfile() {
  return useMutation({
    mutationFn: postProfileFn,
    onSuccess: (data) => {
      console.log("Profile update successful: ", data);
    },
    onError: (err) => {
      console.error("Profile update failed: ", err);
    }
  });
}