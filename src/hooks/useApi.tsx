import { useCallback, useRef, useState } from "react";
import type { AxiosResponse } from "axios";
import api from "../utils/api";

type Method = "get" | "post" | "put" | "delete";

interface Props {
  url: string;
  method?: Method;
  body?: any;
  params?: Record<string, any>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

const useApi = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const lastArgsRef = useRef<Props | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const request = useCallback(
    async ({ method = "get", url, body, params, onSuccess, onError, onFinally }: Props) => {
      try {
        cancel(); // 진행 중이면 취소
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortRef.current = controller;
        lastArgsRef.current = { method, url, body, params };

        let response: AxiosResponse;

        switch (method) {
          case "get":
            response = await api.get(url, { params });
            break;
          case "post":
            response = await api.post(url, body, { params });
            break;
          case "put":
            response = await api.put(url, body, { params });
            break;
          case "delete":
            response = await api.delete(url, { params });
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(response.data);
        onSuccess?.(response.data);
        return response.data;
      } catch (error: any) {
        if (error?.name === "CanceledError") return undefined;
        alert(error.error);
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setLoading(false);
        abortRef.current = null;
        onFinally?.();
      }
    },
    [cancel],
  );

  const refetch = useCallback(() => {
    if (!lastArgsRef.current) return Promise.resolve(data);
    return request(lastArgsRef.current);
  }, [request, data]);

  return { request, data, loading, error, refetch };
};

export default useApi;
