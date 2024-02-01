import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.SERVER_URL;

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export const convertToFormData = (body: any) => {
  const formData = new FormData();
  Object.keys(body).filter(key => body[key] !== null).forEach((key) => formData.append(key, body[key]));
  return formData;
}

export const callApi = async (url: string, body: any, method = HTTP_METHOD.POST) => {
  try {
    const { data }: AxiosResponse = await axios(`${baseUrl}${url}`,
      { headers: { "Content-Type": "multipart/form-data" }, method, data: convertToFormData(body) });
    return {data, err: null};
  } catch (err) {
    return {data: null, err: (err as AxiosError).response}
  }
};

export const baseServerSideFetch = async (endpoint: string, queryParams?: {[key : string]: string}) => {
  if (endpoint.length === 0) {
    throw new Error("Endpoint is required");
  }
  if (Object.keys(queryParams || {}).length > 0) { 
    // TODO: add query params
  }
  const { data, err } = await callApi(endpoint, {}, HTTP_METHOD.GET)
  if (err) throw new Error(err.statusText);
  return data?.data || [];
}

// add caching call, when you think of use-case