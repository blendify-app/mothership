 import { mmkvStorage } from "../lib/mmkv";
console.log("api client", mmkvStorage)
export type ApiClientOptions = {
  method: API_METHODS;
  endpoint: string;
  data: any;
};

export enum API_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
  }

const BASE_URL = "http://192.168.0.152:8080/v1/"; // TODO: change this to env var
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


