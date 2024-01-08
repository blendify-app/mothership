import { mmkvStorage } from "../lib/mmkv";
import { BASE_URL } from "@env";

console.log("api client", mmkvStorage)
export type ApiClientOptions = {
  method: API_METHODS;
  endpoint: string;
  data?: any;
};

export enum API_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
  }

const auth = mmkvStorage.getString("authToken");


export function apiClient({ method, endpoint, data }: ApiClientOptions) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify(data)
  });
}


