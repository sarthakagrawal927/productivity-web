import { HttpStatusCode } from 'axios';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// add caching call, when you think of use-case
export const baseServerSideFetch = async<T>(endpoint: string, queryParams?: { [key: string]: string }) => {
  if (endpoint.length === 0) {
    throw new Error("Endpoint is required");
  }
  if (Object.keys(queryParams || {}).length > 0) {
    // TODO: add query params
  }
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ');
    const data = await fetch(`${baseUrl}${endpoint}`, { cache: 'no-store', headers: { cookie: cookieHeader } });
    if (data.status === HttpStatusCode.Unauthorized) {
      return {err: new Error("Unauthorized"), data: null};
    }
    const json = await data.json()
    return {data: json.data as T, err: null}
  } catch (err) {
    return {data: null, err: err as Error}
  }
}