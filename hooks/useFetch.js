import { useState } from "react";

export function useFetch(url, initialLoadingState) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  const [error, setError] = useState(null);

  const sendRequest = async (options) => {
    setData(null);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        body: options.body || {},
        headers: options.headers || {},
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      setData(data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, sendRequest };
}
