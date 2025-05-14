import { createBrowserRouter, Navigate } from "react-router";
import FirstPage from "../views/first-page";
import SecondPage from "../views/second-page";
import ThirdPage from "../views/third-page";
import Axios from "../utils/axios.instance";
import FourthPage from "../views/fourth-page";

/**
 * @type {import("react-router").RouteObject[]}
 */
const routes = [
   {
      path: "/first",
      loader: async () => {
         const fruits = ["apple", "banana", "cherry"];

         return { fruits };
      },
      element: <FirstPage />,
   },

   {
      path: "/second",
      element: <SecondPage />,
   },

   {
      path: "/third",
      element: <ThirdPage />,
   },

   {
      path: "/fourth",
      element: <FourthPage />,
      loader: async ({ request }) => {
         const MAX_PAGE = 15; // mock total pages
         const url = new URL(request.url);
         let page = +(url.searchParams.get("page") ?? "1");
         let limit = +(url.searchParams.get("limit") ?? "10");

         if (isNaN(+limit)) {
            limit = 10;
         }
         if (isNaN(+page)) {
            page = 1;
         }

         const items = {
            page,
            limit,
            data: [],
            totalPage: MAX_PAGE,
         };

         const start = (page - 1) * limit;

         for (let i = start; i < start + limit; i++) {
            items.data.push("item-" + (i + 1));
         }

         return { items };
      },
   },

   { path: "*", element: <Navigate to="/first" /> },
];
const router = createBrowserRouter(routes);

export default router;
