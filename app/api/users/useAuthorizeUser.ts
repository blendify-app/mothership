import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_METHODS, apiClient, ApiClientOptions } from '../api-client';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../types";
import { mmkvStorage } from '../../lib/mmkv';

const authUserFn = async () => {
    const response = await apiClient({method: API_METHODS.POST, endpoint: "users/authorize", data: null })
    return response;
  };

export function useAuthUser() {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: authUserFn,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
        },
        onSuccess:async (data) => {
            const details = await data.json()
            console.log("Authorization Successful: ", details);
            queryClient.setQueryData(['user', details["data"]["id"]], details);
            mmkvStorage.set("userid", details["data"]["id"]);
            
        },
        onError: (err) => {
            console.log(err)
        }
    });
}  