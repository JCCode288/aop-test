import { useLoaderData, useNavigate } from "react-router";

export default function useInitialData(path) {
   const router = useNavigate();
   const back = () => router(-1);
   const data = useLoaderData();

   const res = { data, back };

   if (path) res.handleNavigation = () => router(path);

   return res;
}
