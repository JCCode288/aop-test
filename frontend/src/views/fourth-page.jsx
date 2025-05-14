import { useSearchParams } from "react-router";
import useInitialData from "../hooks/useInitialData";
import { useMemo } from "react";
import PaginationGroup from "../components/pagination";

export default function FourthPage() {
   const {
      data: { items },
   } = useInitialData();
   const params = new URLSearchParams({
      page: items.page,
      limit: items.limit,
   });
   const [query, setParams] = useSearchParams(params);

   let page = +(query.get("page") ?? "1");
   let limit = +(query.get("limit") ?? "10");

   const paginationNext = (destPage) => {
      if (isNaN(page) || isNaN(limit)) return;
      destPage = page + 1;

      setParams({ page: page + 1, limit });
   };

   const paginationPrev = () => {
      if (isNaN(page) || isNaN(limit)) return;

      setParams({ page: page - 1, limit });
   };

   const paginationMiddle = (destPage) => {
      if (!destPage || typeof destPage !== "number" || isNaN(destPage))
         return;

      setParams({ page: destPage, limit });
   };

   return (
      <div>
         <h1>Fourth Page</h1>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               flexDirection: "column",
            }}
         >
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
               }}
            >
               <ul>
                  {items.data.map((item, i) => (
                     <li key={`${item}-${i}`}>{item}</li>
                  ))}
               </ul>
            </div>
            <PaginationGroup
               curPage={page}
               nextFunc={paginationNext}
               prevFunc={paginationPrev}
               middleFunc={paginationMiddle}
               totalPage={items?.totalPage ?? 1}
            />
         </div>
      </div>
   );
}
