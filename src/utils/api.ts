import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = "http://localhost:1323";

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export const get = async (url: string) => {
  const response = await axios.get(`${baseUrl}${url}`);
  return response.data;
};

export const convertToFormData = (body: any) => {
  const formData = new FormData();
  Object.keys(body).filter(key => !!body[key]).forEach((key) => formData.append(key, body[key]));
  return formData;
}

export const callApi = async (url: string, body: any, method = HTTP_METHOD.POST) => {
  try {
    const { data }: AxiosResponse = await axios(`${baseUrl}${url}`,
      { headers: { "Content-Type": "multipart/form-data" }, method, data: convertToFormData(body) });
    return data;
  } catch(e) {
    console.log({response: (e as AxiosError).response})
  }
};