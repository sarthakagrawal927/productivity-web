import React from 'react';
import { redirect, RedirectType } from 'next/navigation';
import ErrorComponent from '@/components/common/ErrorComponent';
import { baseServerSideFetch } from '@/utils/ssr';

interface FetchDataProps<T extends any[]> {
  /**
   * An array of URLs to fetch data from.
   */
  fetchUrls: string[];

  /**
   * A callback function that takes the fetched data as an argument and returns a JSX element to be rendered.
   * @param data - The fetched data.
   * @returns A JSX element to be rendered.
   */
  onSuccess: (data: T) => JSX.Element;
}

// gets an array of types for each url and returns their response.
const FetchData = async <T extends any[]>({ fetchUrls, onSuccess }: FetchDataProps<T>) => {
  const fetchPromises = fetchUrls.map(url => baseServerSideFetch<any>(url));
  const results = await Promise.all(fetchPromises);

  const errors = results.map(result => result.err).filter(err => err);
  const data = results.map(result => result.data);

  if (errors.some(err => err?.message === "Unauthorized")) {
    return redirect('/signin', RedirectType.replace);
  }

  if (errors.length > 0) {
    return <ErrorComponent message={errors[0]?.message || "No data found"} />;
  }

  return onSuccess(data as T);
};

export default FetchData;