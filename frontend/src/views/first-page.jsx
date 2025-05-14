import { useState } from "react";
import useInitialData from "../hooks/useInitialData";
import RemoveButton from "../components/remove-button";
import PageButton from "../components/page-button";

export default function FirstPage() {
   const {
      handleNavigation,
      back,
      data: { fruits },
   } = useInitialData("/second");

   const [fruitData, setFruitData] = useState(() => fruits);

   // this function will be re rendered during state changes and reinitiate itself
   const removeFruit = (idx) => {
      // currying index and returning function to be executed by button
      return (e) => {
         const filtered = fruitData.filter((f) => f !== fruitData[idx]);
         setFruitData(() => filtered);
      };
   };

   const reset = () => {
      setFruitData(() => fruits);
   };

   return (
      <div>
         <h1>First Question</h1>

         <div
            style={{
               display: "flex",
               flexDirection: "column",
               maxWidth: "60%",
               placeItems: "center",
            }}
         >
            <ul>
               {fruitData.map((f, i) => (
                  <li
                     key={`${f}-${i}`}
                     style={{
                        display: "flex",
                        maxHeight: "4rem",
                        maxWidth: "8rem",
                        gap: "2rem",
                        alignItems: "center",
                        justifyContent: "space-between",
                     }}
                  >
                     <p>{f}</p>
                     <RemoveButton
                        func={removeFruit(i)}
                        label={`remove ${f}`}
                     />
                  </li>
               ))}
            </ul>
            <button onClick={reset}>Reset State</button>
         </div>

         <PageButton func={handleNavigation} />
      </div>
   );
}
