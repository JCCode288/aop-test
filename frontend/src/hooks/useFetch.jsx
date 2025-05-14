import { useCallback, useEffect, useState } from "react";
import Axios from "../utils/axios.instance";

const fetcher = {
   get: Axios.get,
   post: Axios.post,
   put: Axios.put,
   delete: Axios.delete,
};

/**
 * @param {string} path
 * @param {keyof fetcher} method
 * @param {T = any} body
 * @returns {{loading: boolean, error:string, data: T = any}}
 */
export default function useFetch(path, method, body) {
   const [data, setData] = useState(() => []);
   const [loading, setLoading] = useState(() => false);
   const [error, setError] = useState(() => null);
   method = method.toLowerCase();

   const fetch = useCallback(async () => {
      setLoading(() => true);
      try {
         if (method !== "get") {
            const { data } = await fetcher[method](path, body);
            setData(() => data);
            return;
         }

         const { data } = await fetcher[method](path);

         setData(() => data);
         setLoading(() => false);
         setError(() => null); // ensuring previous error doesn't persist
         return;
      } catch (err) {
         setLoading(() => false);
         console.error(err);
         console.log("[Failed to fetch todo data]");
         setError(() => err?.message ?? "Something happened");

         return;
      }
   }, [path, body]);

   useEffect(() => {
      fetch();
   }, []);

   return { loading, error, data };
}
