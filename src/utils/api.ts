import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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
      { headers: { "Content-Type": "multipart/form-data" }, method, data: convertToFormData(body),
        withCredentials: true,
      });
    return {data, err: null};
  } catch (err) {
    return {data: null, err: (err as AxiosError).response}
  }
};

