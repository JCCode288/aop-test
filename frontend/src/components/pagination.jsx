import { useCallback, useMemo } from "react";

export default function PaginationGroup({
   nextFunc,
   middleFunc,
   prevFunc,
   curPage,
   totalPage,
}) {
   const prevDisabled = useMemo(() => curPage < 2, [curPage]);
   const nextDisabled = useMemo(
      () => curPage === totalPage,
      [curPage, totalPage]
   );

   const middlePages = useMemo(() => {
      if (curPage < 3) return Array.from({ length: 5 }, (_, i) => i + 1);

      const low = curPage - 2;
      const top = curPage + 2;

      if (top > totalPage) {
         let pages = [];

         for (let page = totalPage - 4; page <= totalPage; page++) {
            pages.push(page);
         }

         return pages;
      }

      let pages = [];

      for (let page = low; page <= top; page++) {
         pages.push(page);
      }

      return pages;
   }, [curPage, totalPage]);

   const handlePrev = useCallback(() => {
      if (prevDisabled) return;

      prevFunc();
   }, [prevDisabled, prevFunc]);

   // not using callback as it was independent of state
   const handleMid = (p) => {
      return () => middleFunc(p);
   };

   const handleNext = useCallback(() => {
      if (nextDisabled) return;

      nextFunc();
   }, [nextDisabled, nextFunc]);

   return (
      <div
         style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
         }}
      >
         <button disabled={prevDisabled} onClick={handlePrev}>
            prev
         </button>
         <div style={{ display: "flex", gap: "0.5rem" }}>
            {middlePages.map((p, i) => (
               <button key={`mid-${i}`} onClick={handleMid(p)}>
                  {p}
               </button>
            ))}
         </div>
         <button disabled={nextDisabled} onClick={handleNext}>
            next
         </button>
      </div>
   );
}
