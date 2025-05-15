import "./App.css";
import { useEffect, useState } from "react";

function App() {
   const [todo, setTodo] = useState();
   const [refetch, setRefetch] = useState(true);

   async function fetchTodo() {
      try {
         const res = await fetch("http://localhost:4000");
         if (!res.ok) throw new Error("failed to fetch");
         const data = await res.json();

         setTodo(() => data);
         setRefetch(() => false);
      } catch (err) {
         alert("something happened when fetching data");
      }
   }

   useEffect(() => {
      if (refetch) fetchTodo();
   }, [refetch]);

   return (
      <div className="App">
         {todo.map((td) => (
            <div>{JSON.stringify(td)}</div>
         ))}
      </div>
   );
}

export default App;
