import { useEffect, useState } from "react";
import DataList from "../components/data-list";
import PageButton from "../components/page-button";
import useInitialData from "../hooks/useInitialData";
import useFetch from "../hooks/useFetch";

export default function ThirdPage() {
   const { handleNavigation, back } = useInitialData("/fourth");

   const { loading, error, data } = useFetch("/posts", "get");

   if (error)
      return (
         <div style={{ flexDirection: "column" }}>
            <div>Error Happened</div>
            <div>{error}</div>
         </div>
      );

   return (
      <div>
         <h1>Third Question</h1>
         <PageButton label="back" func={back} />
         <div style={{ display: "flex" }}>
            {loading && <div>Loading data..</div>}
            {!loading && data.length && (
               <ul>
                  {data.map((p) => (
                     <DataList data={p} key={p.id} />
                  ))}
               </ul>
            )}
            {!loading && !data.length && <div>No Data from API</div>}
         </div>

         <PageButton func={handleNavigation} />
      </div>
   );
}
